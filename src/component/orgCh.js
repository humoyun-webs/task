// import React, { useState } from 'react';
// import ReactFlow, { addEdge, Background, Controls } from 'reactflow';
// import 'reactflow/dist/style.css';
// import axios from 'axios';

// const initialNodes = []; 
// const initialEdges = []; 

// const App = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [fetchedData, setFetchedData] = useState([]); // State to hold raw fetched data
//   const [inputValue, setInputValue] = useState('');

//   // Fetch data from Supabase or any API
//   const fetchData = async (id) => {
//     try {
//       const response = await axios.post(
//         `https://rervreaebeokxztwdtmv.supabase.co/functions/v1/hello-world?id=${id}`,
//         {},
//         {
//           headers: {
//             Authorization:  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcnZyZWFlYmVva3h6dHdkdG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0Mzc5MTgsImV4cCI6MjA0NTAxMzkxOH0.StHE9XXzMkhs8YgfK2gBL49GfTnVjkwAlsaffNK1vA8`, // Replace with your service role key
//           },
//         }
//       );

//       const data = response.data;
//       console.log('Fetched Data:', data); 
//       setFetchedData(data); // Store fetched data

//       // Create nodes for React Flow
//       const newNodes = data.map((item) => {
//         if (!item.id || !item.name) {
//           console.error('Item missing id or name:', item);
//           return null;
//         }

//         return {
//           id: item.id.toString(),
//           data: { label: item.name || 'Unnamed' },
//           position: {
//             x: item.position?.x || Math.random() * 100,
//             y: item.position?.y || Math.random() * 100,
//           },
//         };
//       }).filter(node => node !== null);

//       setNodes(newNodes);

//       // Create edges based on relationships (e.g., parent_id)
//       const newEdges = data
//         .filter((item) => item.parent_id)
//         .map((item) => ({
//           id: `e${item.parent_id}-${item.id}`,
//           source: item.parent_id.toString(),
//           target: item.id.toString(),
//           type: 'smoothstep',
//         }));

//       setEdges(newEdges);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchData(inputValue); // Fetch data on form submission
//   };

//   return (
//     <div style={{ height: '100vh' }}>
//       {/* Input Form */}
//       <form onSubmit={handleSubmit} style={{ padding: '20px', marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Enter ID"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           style={{
//             padding: '10px',
//             fontSize: '16px',
//             marginRight: '10px',
//             borderRadius: '4px',
//             border: '1px solid #ccc',
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: '10px 15px',
//             fontSize: '16px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         >
//           Submit
//         </button>
//       </form>

//       {/* Display data on cards */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
//         {fetchedData.map((item) => (
//           <div key={item.id} style={{
//             border: '1px solid #ccc',
//             padding: '15px',
//             borderRadius: '8px',
//             width: '200px',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//             backgroundColor: '#fff',
//           }}>
//             <h3 style={{ margin: '0 0 10px' }}>{item.name || 'Unnamed'}</h3>
//             <p><strong>ID:</strong> {item.id}</p>
//             <p><strong>Parent ID:</strong> {item.parent_id || 'None'}</p>
//           </div>
//         ))}
//       </div>

//       {/* React Flow canvas */}
//       <div style={{ height: '50%', width: '100%' }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={setNodes}
//           onEdgesChange={setEdges}
//           onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
//           fitView
//         >
//           <Background />
//           <Controls />
//         </ReactFlow>
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState } from 'react';
import axios from 'axios';
import './ass.css'; 

const App = () => {
  const [nodes, setNodes] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 

  const fetchData = async (id) => {
    try {
      const response = await axios.post(
        `https://rervreaebeokxztwdtmv.supabase.co/functions/v1/hello-world?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcnZyZWFlYmVva3h6dHdkdG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0Mzc5MTgsImV4cCI6MjA0NTAxMzkxOH0.StHE9XXzMkhs8YgfK2gBL49GfTnVjkwAlsaffNK1vA8`, 
          },
        }
      );

      const data = response.data;
      console.log('Fetched Data:', data);
     
      setNodes((prevNodes) => [
        ...prevNodes,
        ...data.map((item) => ({
          id: item.id.toString(),
          name: item.name || 'Unnamed',
          parentId: item.parent_id || null,
        })),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNodes([]); 
    fetchData(inputValue);
  };

  const handleExpand = (id) => {
    fetchData(id);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="fetch-form">
        <input
          type="text"
          placeholder="Enter Root Node ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Fetch Nodes
        </button>
      </form>

      <div className="nodes-container">
        {nodes.map((node) => (
          <div key={node.id} className="node-card">
            <h3 className="node-title">{node.name}</h3>
            <p><strong>ID:</strong> {node.id}</p>
            <p><strong>Parent ID:</strong> {node.parentId || 'None'}</p>
            <button onClick={() => handleExpand(node.id)} className="expand-button">
              Expand
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

