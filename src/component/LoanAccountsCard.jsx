import React from 'react';
import LoanAccoustsTable from './LoanAccoustsTable';

const LoanAccountsCard = ({ data, value }) => {

    console.log(value);
    return (
        <div>
            <div >
                <table className="table ">
                    <tbody>
                        <LoanAccoustsTable data={{ ...data, value }} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoanAccountsCard;

