import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");

    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => console.log(document.data()));
    };

    useEffect(() => {
        getNweets();
    }, []);


    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input 
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value={nweet} />
        </form>
    );
};

export default Home;
