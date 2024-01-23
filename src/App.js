import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import CSVReader from 'react-csv-reader';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFileUpload = (data) => {
    
    const newTransactions = data.map(([date, description, amount, currency]) => ({
      date,
      description,
      amount,
      currency,
    }));

    setTransactions(newTransactions);
  };

  const handleAddTransaction = () => {
    
  };

  const handleCheckboxChange = (index) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);
  };

  const handleDelete = () => {
    
    const newTransactions = transactions.filter((_, index) => !selectedRows[index]);
    setTransactions(newTransactions);
    setSelectedRows([]);
  };

  const handleEdit = () => {
    
  };

  return (
    <div>
      <div>
        <CSVReader onFileLoaded={handleFileUpload} />
        <Button onClick={handleAddTransaction}>Add Transaction</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedRows[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>
                {selectedRows[index] && (
                  <>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button variant="warning" onClick={handleEdit}>
                      Edit
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
