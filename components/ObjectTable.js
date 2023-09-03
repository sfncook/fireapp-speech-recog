import React from 'react';
import styles from '@/styles/ObjectTable.module.css'

const ObjectTable = ({ data }) => {

    function formatCamelCaseString(input) {
        const spacedString = input.replace(/([A-Z])/g, ' $1'); // Add spaces before capital letters
        return spacedString.toLowerCase().charAt(0).toUpperCase() + spacedString.slice(1); // Capitalize the first character
    }
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
                <td className={styles.keyCell}>{formatCamelCaseString(key)}</td>
                <td className={styles.valueCell}>{formatValue(data[key])}</td>
            </tr>
        ))
    };

    return (
        <table className={styles.objectTable}>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
};

export default ObjectTable;
