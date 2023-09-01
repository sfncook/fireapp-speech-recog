import React from 'react';

const ObjectTable = ({ data }) => {
    const formatValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        } else if (Array.isArray(value)) {
            return value.join(', ');
        } else if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value;
        }
    };

    const renderTableRows = () => {
        return Object.keys(data).map((key, index) => (
            <tr key={index}>
                <td>{key}</td>
                <td>{formatValue(data[key])}</td>
            </tr>
        ))
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
};

export default ObjectTable;
