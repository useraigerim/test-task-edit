import React, {useState} from 'react';
import tableAigerim from "../api/mock_stores.json"
import {sumRow, sumColumn, sumSuper} from "./utils";

export const Table = () => {
    const classCell = 'border-solid border border-indigo-600 p-2 hover:border-b-gray-900 '
    const [table, setTable] = useState(tableAigerim)

    const initialTotalStore = tableAigerim.map(item => sumRow(item.months))
    const [totalStore, setTotalStore] = useState(initialTotalStore);

    const initialTotalMonth = sumColumn(tableAigerim)
    const [totalMonth, setTotalMonth] = useState(initialTotalMonth);

    const superSum = sumSuper(totalMonth)


    const handleChange = (e, row, column) => {
        const {value} = e.target

        if (isNaN(Number(value))) return

        const _table = [...table]
        _table[row].months[column].value = value
        setTable(_table)

        const _totalStore = [...totalStore]
        const total = sumRow(table[row].months)
        _totalStore[row] = total
        setTotalStore(_totalStore)

        setTotalMonth(sumColumn(table))
    }


    return (
        <div>

            <div className={'flex flex-row bg-blue-100 '}>
                <div className={classCell + 'w-24'}>Title</div>
                {table[0].months.map((item, key) => (
                    <div className={classCell + 'w-12'} key={key + '123'}>{item.name}</div>
                ))}
                <div className={classCell + 'w-24'}>Summer</div>
            </div>


            {table.map((item, row) => (
                <div className={'flex flex-row'} key={item.store.id}>

                    <div className={classCell + 'w-24'}>{item.store.name}</div>

                    {item.months.map((subItem, column) => (
                        <input
                            key={subItem.id}
                            className={classCell + ' w-12 '}
                            onChange={e => handleChange(e, row, column)}
                            value={subItem.value !== 0 ? subItem.value : ""}
                            placeholder="0"
                        />
                    ))}

                    <div className={classCell + 'w-24  bg-blue-100 '}>
                        {totalStore[row]}
                    </div>

                </div>
            ))}

            <div className={'flex flex-row bg-blue-100 '}>
                <div className={classCell + 'w-24'}>Title</div>
                {totalMonth.map((item, key) => (
                    <div className={classCell + 'w-12'} key={key + '123'}>{item}</div>
                ))}
                <div className={classCell + 'w-24'}>{superSum}</div>
            </div>
        </div>
    );
};

export default Table;