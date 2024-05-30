import './xpong.scss';

import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Game from '/components/game/game';


let Xpong = function() {
    const router = createBrowserRouter([
        {
          path: "/game",
          element: <Game/>,
        }
      ]);


    return (
        <div className={'xpong'}>
            <div className={'xpong__content'}>
                <RouterProvider router={router} />
            </div>
        </div>
    );
};

export default Xpong;