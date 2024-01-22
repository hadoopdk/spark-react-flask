// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Alert, Card } from 'react-bootstrap';


// function App() {
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState('');

//   const handleFileChange = event => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async event => {
//     event.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResponse(JSON.stringify(response.data, null, 2));
      
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setResponse('Failed to upload and process the file.'+error);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Card>
//         <Card.Body>
//           <h1 className="text-center">Upload a CSV File</h1>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formFile" className="mb-3">
//               <Form.Label>Select File</Form.Label>
//               <Form.Control type="file" onChange={handleFileChange} />
//             </Form.Group>
//             <Button variant="primary" type="submit">Upload</Button>
//           </Form>
//           {response && (
//             <Alert variant="success" className="mt-3">
//               <pre>{response}</pre>
//             </Alert>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// export default App;



import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [row_count, setRowCount] = useState(null);
  const [sampleRecords, setSampleRecords] = useState([]);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setMetadata(response.data.metadata);
      setRowCount(response.data.row_count)
      setSampleRecords(response.data.sample_records);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Upload a CSV File</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Upload</Button>
      </Form>

      <hr /> {/* Horizontal Rule as Divider */}

      {metadata && (
        <div>
          <h3>Metadata</h3>
          <p><strong>Columns:</strong> {metadata.columns.join(', ')}</p>
          <p><strong>Data Types:</strong> {JSON.stringify(metadata.data_types)}</p>
        </div>
      )}


      {row_count && (
        <div>
          <h3>Row Count</h3>
          <p><strong>row_count:</strong> {row_count}</p>
        </div>
      )}


      {sampleRecords.length > 0 && (
        <div>
          <h3>Sample Records</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {metadata.columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleRecords.map((record, index) => (
                <tr key={index}>
                  {metadata.columns.map((col, idx) => (
                    <td key={idx}>{record[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default App;
