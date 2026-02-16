import { useEffect, useState, useRef } from "react";

const words = ["Web Developer", "Mobile Apps Developer", "AI Engineer"];

export default function TypingText() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const speed = useRef(60);
    const pause = 400;

    useEffect(() => {
        let timeout;

        const current = words[wordIndex];
        const done = !isDeleting && text === current;
        const empty = isDeleting && text === "";

        timeout = setTimeout(() => {
            if (done) return setIsDeleting(true);
            if (empty) {
                setIsDeleting(false);
                setWordIndex((i) => (i + 1) % words.length);
                return;
            }

            setText((prev) =>
                isDeleting
                    ? current.slice(0, prev.length - 1)
                    : current.slice(0, prev.length + 1)
            );
        }, done || empty ? pause : speed.current);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <span className="flex text-cyan-400 text-base md:text-lg justify-center md:justify-start font-bold">
            {text}
            <span className="animate-pulse"> |</span>
        </span>
    );
}
