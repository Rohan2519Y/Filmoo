import { useStyles } from "./MovieinterfaceCss";
import MaterialTable from "@material-table/core";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { getData, serverURL } from "../../backendservices/FetchNodeServices";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
export default function DisplayAllMovie() {

    const [listMovies, setListMovies] = useState([])

    const fetchAllMovies = async () => {
        var response = await getData('movie/fetch_movies')
        if (response.status) {
            setListMovies(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Movie Register",
                text: response.message,
                toast: true
            });
        }
    }
    useEffect(function () {
        fetchAllMovies()
    }, [])

    function DisplayAll() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <div style={{ padding: 10 }}>
                    <MaterialTable
                        title="Movie"
                        columns={[
                            { title: 'ID', field: 'movieid', width: '3%' },
                            { title: 'Category', field: 'categoryname', width: '7%' },
                            { title: 'Name', field: 'name', width: '5%' },
                            { title: 'Language', field: 'language', width: '10%' },
                            { title: 'Year', field: 'year', width: '4%' },
                            { title: 'Genre', field: 'genre', width: '18%' },
                            { title: 'Quality', field: 'quality', width: '5%' },
                            {
                                title: 'Links', render: (rowData) =>
                                    <div>
                                        <div>{rowData.link480p}</div>
                                        <div>{rowData.link720p}</div>
                                        <div>{rowData.link1080p}</div>
                                        <div>{rowData.link4k}</div>
                                    </div>
                            },
                            {
                                title: 'Sizes', render: (rowData) =>
                                    <div>
                                        <div>{rowData.size480p}</div>
                                        <div>{rowData.size720p}</div>
                                        <div>{rowData.size1080p}</div>
                                        <div>{rowData.size4k}</div>
                                    </div>
                            },
                            { title: 'Image', width: '4%', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.image}`} style={{ width: 40, height: 40, borderRadius: 10 }} /></div> },
                            {
                                title: 'Screenshots',
                                render: (rowData) => {
                                    const screenshots = typeof rowData.screenshot === 'string'
                                        ? rowData.screenshot.split(',').map(item => item.trim())
                                        : Array.isArray(rowData.screenshot)
                                            ? rowData.screenshot
                                            : [];

                                    return (
                                        <div style={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {screenshots.map((item, index) => (
                                                <img
                                                    key={index}
                                                    src={`${serverURL}/images/${item}`}
                                                    style={{ width: 40, height: 40, borderRadius: 10 }}
                                                    alt={`screenshot-${index}`}
                                                    onError={(e) => { e.target.style.display = 'none'; }} // hides broken images
                                                />
                                            ))}
                                        </div>
                                    );
                                }
                            }
                        ]}
                        data={listMovies}
                        options={{ search: true, tableLayout: "fixed" }}
                        actions={[
                            {
                                icon: () => <EditIcon />,
                                tooltip: 'Edit Movie Details',
                                onClick: (event, rowData) => alert("Edit movie: " + rowData.name)
                            },
                            {
                                icon: () => <DeleteIcon />,
                                tooltip: 'Delete Movie',
                                onClick: (event, rowData) => alert("Delete movie: " + rowData.name)
                            },
                            {
                                icon: () => <SaveIcon />,
                                tooltip: 'Add New Movie',
                                isFreeAction: true,
                                onClick: () => alert("Add new movie")
                            }
                        ]}

                    />
                </div>
            </div>
        );
    }
    return (
        <div>
            {DisplayAll()}
        </div>
    )
}