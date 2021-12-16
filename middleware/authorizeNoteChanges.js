const jwt = require("express-jwt");
const Note = require("../models/Note");

module.exports = authorizeNoteChanges;

function authorizeNoteChanges() {
    return [
        // middleware que desencriptan el auth token y lo guarda en req.user
        jwt({
            secret: process.env.SECRET,
            algorithms: ["HS256"],
            getToken: function fromHeaderOrQuerystring(req) {
                if (req.headers.authorization &&
                    req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer') {
                    return req.headers.authorization.split(' ')[1]

                } else if (req.headers.token &&
                    req.headers.token.split(' ')[0].toLowerCase() === 'bearer') {
                    return req.headers.token.split(' ')[1]
                }
                return null;
            }
        }),

        // authorize if user is admin or owner of the note to change
        async (req, res, next) => {
            console.log("**authorizeNoteChanges**")
            console.log("REQ.USER: ", req.user)
            const userId = req.user.id
            const noteId = req.params.id
            let userIdOwnerOfNote;

            const note = await Note.findById(noteId)
            if (note) {
                userIdOwnerOfNote = note.user[0]

                if (req.user.role === 'admin' || userIdOwnerOfNote == userId) {
                    //  authorization successful!!
                    next()
                }
                else {
                    // user is not authorized
                    return res.status(401).json(
                        { message: "Unauthorized. A user only can delete/edit his own notes" }
                    )
                }
            }
            else {
                // the note doest'n exist
                return res.status(404).json(
                    { message: "the note with that id doest'n exist" }
                )
            }

        },
    ]
}