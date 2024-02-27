import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getAllProposals } from '../utils/proposal_api';

export default function DataTable() {
  const [proposals, setProposals] = useState([]);
    useEffect(() => {
        getAllProposals()
            .then(response => {
                setProposals(response.data)
            })
            .catch(error => {
                console.error('Error fetching proposals:', error);
            });
    }, []);

  const proposalColumns = [
    { field: 'no', headerName: 'No', width: 87},
    { field: 'kegiatan', headerName: 'Kegiatan', minWidth: 200 },
    { field: 'panitia', headerName: 'Ketua Panitia', minWidth: 150, sortable: false},
    { field: 'date_started', headerName: 'Tgl Mulai', type: 'Date', minWidth: 100 },
    { field: 'date_ended', headerName: 'Tgl Selesai', minWidth: 100 },
    { field: 'action', headerName: 'Aksi', minWidth: 100, renderCell: (params) => <a href={`#${params.row.panitia}`}>action</a> },
  ];

  const proposalRows = proposals.map((proposal,index) => ({
      id: index,
      no: index + 1,
      kegiatan: proposal.proposal_titles,
      panitia: proposal.commitee_names,
      date_started: proposal.date_started,
      date_ended: proposal.date_ended,
  }) )

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={proposalColumns}
        rows={proposalRows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}