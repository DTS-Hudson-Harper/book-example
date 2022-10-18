import "./App.css";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import Book from "./components/Book";

function App() {
    const { isLoading, error, data, refetch } = useQuery(
        ["books"],
        async () => {
            const { data: response } = await axios.get(
                "http://localhost:3000/books"
            );
            return response;
        }
    );

    const { mutate: mutateAdd } = useMutation(async (id) => {
        await axios.post(`http://localhost:3000/books`, {
            title: "New Book",
            author: "New Author",
            year: 2022,
        });
        refetch();
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="App">
            <h1>Micah's Bookstore</h1>
            {data.map((book) => (
                <Book key={book.id} book={book} refetch={refetch} />
            ))}
            <button className="add" onClick={mutateAdd}>
                Add New Book
            </button>
        </div>
    );
}

export default App;
