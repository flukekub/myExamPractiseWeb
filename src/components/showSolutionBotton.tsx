import { Button } from "@mui/material";
import React from "react";

export function ShowSolutionButton( {onClick , children, colors}: { onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void , children: React.ReactNode, colors?:string }) {
    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        onClick(ev);
    };
    if( !colors ) {
        colors = "from-blue-500 to-cyan-500";
    }

    return (
      <Button
        className={`!rounded-full !normal-case !px-3 !mr-3 !py-2 !text-sm !font-normal !text-white bg-gradient-to-r ${colors} shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300`}
        onClick={handleClick}
      >
        {children}
      </Button>
    );
}
