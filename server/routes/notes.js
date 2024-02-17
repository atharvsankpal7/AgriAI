const express = require("express");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// endpoint --> /api/notes/getallnotes. Login required
router.get("/getallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }).lean();
        res.json(notes);
    } catch (e) {
        console.log("Error in getallnotes", e);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/getallnotesAdmin", fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId);
        if (!user.isAdmin) {
            res.status(401).json({ error: "Unauthenticated user" });
            return;
        }
        const notes = await Notes.find({
            description: { $exists: false },
        }).lean();
        res.json(notes);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Server error" });
    }
});

// endpoint --> /api/notes/addnote. Login required
/**
 * Adds a new note for the authenticated user.
 *
 * Accepts the baseImage and saves a new Note document to the database.
 * Associates the new note with the authenticated user's ID.
 *
 * Returns the saved note document.
 */
router.post(
    "/addnote",
    fetchuser,
    [
        body("baseImage", "Please enter the baseImage")
            .trim()
            .isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors });
                return; // Important: Add a return statement to exit the function here
            }
            let base64Image = req.body.baseImage.split(",")[1];
            let formData = new FormData();
            let img;
            let newNote;
            formData.append("baseImage", base64Image);
            await fetch("http://localhost:4000/predict", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    let base64Image = data.prediction.imagefile;
                    img = "data:image/png;base64," + base64Image;
                    newNote = new Notes({
                        user: req.user.id,
                        baseImage: img,
                        date: Date.now(),
                        title: data.prediction.plantLabel
                    });

                })


            const savedNote = await newNote.save();
            res.send(savedNote);
        } catch (e) {
            res.status(500).send("database connectivity error");
        }
    }
);

// endpoint --> /api/notes/updatenote. Login required
/**
 * Updates an existing note for the authenticated user.
 *
 * Accepts the note ID in the URL parameter.
 * Accepts updated description, tag, and maskedImage in the request body.
 * Updates the corresponding fields in the note document.
 * Returns the updated note document.
 */
router.put("/updatenote/:id", async (req, res) => {
    try {
        const { description, tag, maskedImage } = req.body;
        const newNote = {};
        // check for updated parameters
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        if (maskedImage) newNote.maskedImage = maskedImage;
        // Find the note by id provided in the url
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Note not found");
        }
        // Updation success
        //findByIdAndUpdate(note_to_be_updated, what_should_be_updated,if_new_parameters_are_updated_add_them)
        note = await Notes.findByIdAndUpdate(req.params.id, newNote, {
            new: true,
        });
        res.json(note);
    } catch (e) {
        res.status(500).send("database connectivity error");
        console.log(e);
    }
});

// endpoint --> api/notes/deletenote/id
/**
 * Deletes an existing note for the authenticated user.
 *
 * Accepts the note ID in the URL parameter.
 * Checks if the note exists and if the logged in user is the owner.
 * Deletes the note if found and owned.
 * Returns appropriate success/error responses.
 */
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note in the database
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("note not found");
        }
        // If the logged-in user doesn't own the note
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Unauthenticated user");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.send("note deleted successfully");
    } catch (e) {
        res.send("database connectivity error");
    }
});

module.exports = router;
