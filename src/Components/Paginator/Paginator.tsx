import React, { useState } from "react";
import styles from "./Paginator.module.css";

export const Paginator: React.FC<PaginatorPropsType> = (props) => {
    const {
        currentItem,
        itemCount,
        totalItemCount,
        onChangeItemHandler,
        portionSize,
    } = props;
    let pagesCount = Math.ceil(totalItemCount / itemCount);
    let pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const [portionNumber, setPortionNumber] = useState(1);
    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && (
                <button
                    className={styles.icon}
                    onClick={() => {
                        setPortionNumber(portionNumber - 1);
                    }}
                >
                    L
                </button>
            )}

            {pages
                .filter(
                    (p) =>
                        p >= leftPortionPageNumber &&
                        p <= rightPortionPageNumber
                )
                .map((p) => {
                    return (
                        <span
                            key={p}
                            className={
                                currentItem === p ? styles.selectedPage : ""
                            }
                            onClick={() => {
                                onChangeItemHandler(p);
                            }}
                        >
                            {p}
                        </span>
                    );
                })}
            {portionCount > portionNumber && (
                <button
                    className={styles.icon}
                    onClick={() => {
                        setPortionNumber(portionNumber + 1);
                    }}
                >
                    R
                </button>
            )}
        </div>
    );
};

export type PaginatorPropsType = {
    currentItem: number;
    itemCount: number;
    totalItemCount: number;
    portionSize: number;
    onChangeItemHandler: (page: number) => void;
};
