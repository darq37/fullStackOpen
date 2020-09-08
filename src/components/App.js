import React from "react";
import { Thing } from "./Thing";
export const App = ({ things }) => {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {things.map((thing) => <Thing key={thing.type} thing={thing} />
        )}
      </ul>
    </div>
  );
};
