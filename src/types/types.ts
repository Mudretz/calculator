import { FC } from "react";

export type Props = {
    id: number;
    board: boolean;
};

export interface Drop {
    id: number;
    Components: FC<Props>;
}

export interface Board {
    id: number;
    name: string;
}
