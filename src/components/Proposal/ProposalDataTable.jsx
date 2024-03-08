import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Button } from '@mui/material';

export default function ProposalDataTable({proposals, setProposalId, setOpenDetail}) {
  function handleClick(proposalId){
    setProposalId(proposalId)
    setOpenDetail(true); 
  }

  const proposalColumns = [
    { field: 'no', headerName: 'No', width: 87 },
    { field: 'kegiatan', headerName: 'Kegiatan', minWidth: 300 },
    { field: 'panitia', headerName: 'Ketua Panitia', minWidth: 200, sortable: false },
    { field: 'date_started', headerName: 'Tgl Mulai', type: 'Date', minWidth: 120 },
    { field: 'date_ended', headerName: 'Tgl Selesai', minWidth: 120 },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 120,
      renderCell: (params) => <Button variant='outlined' size='small' onClick={() =>handleClick(params.row.proposal_id)}>Detail</Button>
    },
  ];

  const proposalRows = proposals.map((proposal, index) => ({
    proposal_id: proposal.proposal_id,
    id: index,
    no: index + 1,
    kegiatan: proposal.proposal_titles,
    panitia: proposal.commitee_names,
    date_started: dayjs(proposal.date_started).format('DD/MM/YYYY'),
    date_ended: dayjs(proposal.date_ended).format('DD/MM/YYYY'),
  }))

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
        disableRowSelectionOnClick
      />
    </div>
  );
}