import { useStyles } from "./MovieinterfaceCss";
import MaterialTable from "@material-table/core";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { serverURL } from "../../backendservices/FetchNodeServices";
export default function DisplayAllMovie() {
    const data = [
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ];

    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <div style={{ padding: 10 }}>
                <MaterialTable
                    title="Basic Search Preview"
                    columns={[
                    { title: 'ID', field: 'productid' },
                    { title: 'Service', render:(rowData)=><div>{rowData.servicetype} {rowData.servicename}</div> },
                    { title: 'Brand', field: 'brandname' },
                    { title: 'Name', field: 'productname' },
                    { title: 'Description', field: 'productdescription' },
                    { title: 'Icon', render: (rowData) => <div style={{ cursor: 'pointer' }} ><img src={`${serverURL}/images/${rowData.productpicture}`} style={{ width: 40, height: 40, borderRadius: 7 }} /></div> },
                ]}
                    data={data}
                    options={{ search: true }}
                    actions={[
                        {
                            icon: () => <SaveIcon />,
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name),
                        },
                        {
                            icon: () => <DeleteIcon />,
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                        },
                    ]}
                />
            </div>
        </div>
    );
}
