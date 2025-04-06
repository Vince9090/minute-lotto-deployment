import React, { useEffect, useState } from "react";
import useSocket from '../hooks/useSocket';
import { getUserBets } from "../api/home/PlaceBetAPI";

/**
 * 
 * @returns Winning Container
 */
const WinningPopUpContainer = () => {
    const [isVisisble, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); 
    
    const { isConnected, socket } = useSocket();

    useEffect(() => {
        if (!isConnected) return;

        // ✅ Listen for the winning event
        socket.on("draw_result", async (data) => {
            
            const response = await getUserBets();
            const userBets = response.data.bet;


            if (userBets.length === 0) {
                setMessage("ROUND ENDED");
                setStatus("round-ended");

            } else {

                const hasWin = userBets.some(bet => bet.status === "win");

                if (hasWin) {
                    setMessage("YOU'VE WON!");
                    setStatus("win");
                } else {
                    setMessage("YOU'VE LOST");
                    setStatus("lose")
                }              
            }

            setIsVisible(true); 
            
            setTimeout(() => {
                setIsVisible(false);
            }, 6000);
        });

        return () => {
            socket.off("draw_result");
        };
    }, [isConnected, socket]);

    return (
        <div className={`winning-popup ${isVisisble ? "show" : ""} ${status}`} id="winning-popup">
            <span id="win-message">{message}</span>
        </div>
    );
};

export default WinningPopUpContainer;