import "./Book.module.css";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Book({ book, refetch }) {
    const [bookTitle, setBookTitle] = useState(book.title);
    const [bookAuthor, setBookAuthor] = useState(book.author);

    const { mutate: mutateTitle } = useMutation(async (e) => {
        setBookTitle(e.target.value);
        await axios.patch(`http://localhost:3000/books/${book.id}`, {
            title: e.target.value,
        });
        refetch();
    });

    const { mutate: mutateAuthor } = useMutation(async (e) => {
        setBookAuthor(e.target.value);
        await axios.patch(`http://localhost:3000/books/${book.id}`, {
            author: e.target.value,
        });
        refetch();
    });

    const { mutate: mutateDelete } = useMutation(async () => {
        await axios.delete(`http://localhost:3000/books/${book.id}`);
        refetch();
    });

    return (
        <div>
            <label htmlFor="Title">
                Title
                <input
                    id="title"
                    type="textarea"
                    onChange={mutateTitle}
                    defaultValue={bookTitle}
                />
            </label>
            <label htmlFor="author">
                Author
                <input
                    id="author"
                    type="textarea"
                    onChange={mutateAuthor}
                    defaultValue={bookAuthor}
                />
            </label>
            <button className="delete" onClick={mutateDelete}>
                Delete
            </button>
        </div>
    );
}
