import { useStyles } from "./MovieinterfaceCss";
import { useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FormGroup, Checkbox, Button, Grid, MenuItem, Radio, TextField, InputLabel, Select } from "@mui/material"
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import EditIcon from '@mui/icons-material/Edit';
import { getData, serverURL, postData } from "../../backendservices/FetchNodeServices";
import Swal from "sweetalert2";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
export default function DisplayAllMovie() {
    const classes = useStyles()
    const [listMovies, setListMovies] = useState([])
    const [open, setOpen] = useState(false)
    const [dialogState, setDialogState] = useState('')
    const navigate = useNavigate()

    const [categoryId, setCategoryId] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [link480P, setLink480P] = useState('')
    const [size480P, setSize480P] = useState('')
    const [link720P, setLink720P] = useState('')
    const [size720P, setSize720P] = useState('')
    const [link1080P, setLink1080P] = useState('')
    const [size1080P, setSize1080P] = useState('')
    const [link4k, setLink4k] = useState('')
    const [size4k, setSize4k] = useState('')
    const [description, setDescription] = useState('')
    const [screenshot, setScreenshot] = useState([])
    const [image, setImage] = useState({ filename: '/film.png', bytes: '' })
    const [quality, setQuality] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [error, setError] = useState({})

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

    const handleGenreChange = (event) => {
        const value = event.target.name;
        if (selectedGenres.includes(value)) {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        } else {
            setSelectedGenres([...selectedGenres, value]);
        }
    };

    const languageList = [
        'Hindi', 'English', 'Tamil', 'Telgu', 'Gujarati', 'Marathi', 'Japanese', 'Chinese'
    ]
    const genresList = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Historical", "Horror", "Music", "Mystery",
        "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
    ];

    const handleLanguageChange = (e) => {
        const value = e.target.name
        setSelectedLanguage([])
        if (selectedLanguage.includes(value)) {
            setSelectedLanguage(selectedLanguage.filter((language) => language !== value));
        } else {
            setSelectedLanguage([...selectedLanguage, value]);
        }
    }

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_categories")
        setCategoryList(res.data)
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])
    const fillCategory = () => {
        return (categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        }))
    }

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    const handleQuality = () => {
        switch (quality) {
            case "480P":
                return (
                    <>
                        <Grid size={12}>
                            <TextField value={link480P} onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField value={size480P} onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )

            case "720P":
                return (
                    <>
                        <Grid size={6}>
                            <TextField value={link480P} onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField value={link720P} onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField value={size480P} onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField value={size720P} onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                    </>)

            case "1080P":
                return (
                    <>
                        <Grid size={4}>
                            <TextField value={link480P} onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField value={link720P} onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField value={link1080P} onChange={(e) => setLink1080P(e.target.value)} label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField value={size480P} onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField value={size720P} onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField value={size1080P} onChange={(e) => setSize1080P(e.target.value)} label='1080P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            case "4K":
                return (
                    <>
                        <Grid size={3}>
                            <TextField value={link480P} onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={link720P} onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={link1080P} onChange={(e) => setLink1080P(e.target.value)} label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={link4k} onChange={(e) => setLink4k(e.target.value)} label='4K Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={size480P} onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={size720P} onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={size1080P} onChange={(e) => setSize1080P(e.target.value)} label='1080P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField value={size4k} onChange={(e) => setSize4k(e.target.value)} label='4K Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            default:
                return null;
        }
    }

    const handleOpenDialog = (rowData, state) => {
        setDialogState(state)
        setCategoryId(rowData.categoryid)
        setName(rowData.name)
        setYear(rowData.year)
        setSelectedLanguage(rowData.language)
        setSelectedGenres(rowData.genre)
        setDescription(rowData.description)
        setQuality(rowData.quality)
        setLink480P(rowData.link480p)
        setLink720P(rowData.link720p)
        setLink1080P(rowData.link1080p)
        setLink4k(rowData.link4k)
        setSize480P(rowData.size480p)
        setSize720P(rowData.size720p)
        setSize1080P(rowData.size1080p)
        setSize4k(rowData.size4k)
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }

    const handleClick = async () => {
        var err = false
        if (categoryId.length == 0) {
            err = true
            handleErrorMessage('categoryId', 'Please Select Category...')
        }
        if (name.length == 0) {
            err = true
            handleErrorMessage('name', 'Please Input Name...')
        }
        if (year.length == 0) {
            err = true
            handleErrorMessage('year', 'Please Input Year...')
        }
        if (selectedLanguage.length == 0) {
            err = true
            handleErrorMessage('selectedLanguage', 'Please Select Language...')
        }
        if (selectedGenres.length == 0) {
            err = true
            handleErrorMessage('selectedGenres', 'Please Select Genre...')
        }
        if (description.length == 0) {
            err = true
            handleErrorMessage('description', 'Please Input Description...')
        }
        if (quality.length == 0) {
            err = true
            handleErrorMessage('quality', 'Please Select Quality...')
        }
        
        if (err == false) {
            var body = {
                'categoryid': categoryId,
                'name': name,
                'language': selectedLanguage,
                'year': year,
                'genre': selectedGenres,
                'description': description,
                'quality': quality,
                'link480p': link480P, 'link720p': link720P, 'link1080p': link1080P, 'link4k': link4k,
                'size480p': size480P, 'size720p': size720P, 'size1080p': size1080P, 'size4k': size4k
            }
            var result = await postData('movie/edit_movies', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Movie Register",
                    text: result.message,
                    toast: true
                });
                fetchAllMovies()
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Movie Register",
                    text: result.message,
                    toast: true
                });
            }
        }
    }

    const openDialog = () => {
        return <Dialog open={open}>
            <DialogContent>{dialogState == 'data' ? movieForm() : pictureForm()}</DialogContent>\
            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    }

    const movieForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' />
                    <div className={classes.name}>Add Movie</div>
                    <img src="/verification.png" style={{ height: '8vh' }}></img>
                </div>
                <div style={{ margin: 10 }}>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <FormControl error={error.categoryId} onFocus={() => handleErrorMessage('categoryId', null)} fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Category" >
                                    {fillCategory()}
                                </Select>
                                <FormHelperText>{error.categoryId}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <TextField error={error.name} helperText={error.name} onFocus={() => handleErrorMessage('name', null)} label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField error={error.year} helperText={error.year} onFocus={() => handleErrorMessage('year', null)} label='Year' value={year} onChange={(e) => setYear(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={12}>
                            <FormControl error={error.selectedLanguage} onFocus={() => handleErrorMessage('selectedLanguage', null)} component="fieldset" fullWidth>
                                <FormLabel component="legend">Language</FormLabel>
                                <FormGroup row>
                                    {languageList.map((language) => (
                                        <FormControlLabel key={language} control={<Checkbox checked={selectedLanguage.includes(language)} onChange={handleLanguageChange} name={language} />}
                                            label={language} />
                                    ))}
                                </FormGroup>
                                <FormHelperText>{error.selectedLanguage}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <FormControl error={error.selectedGenres} onFocus={() => handleErrorMessage('selectedGenres', null)} component="fieldset" fullWidth>
                                <FormLabel component="legend">Genre</FormLabel>
                                <FormGroup row>
                                    {genresList.map((genre) => (
                                        <FormControlLabel key={genre} control={<Checkbox checked={selectedGenres.includes(genre)} onChange={handleGenreChange} name={genre} />}
                                            label={genre}
                                        />
                                    ))}
                                </FormGroup>
                                <FormHelperText>{error.selectedGenres}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid size={12} >
                            <FormControl error={error.description} onFocus={() => handleErrorMessage('description', null)} fullWidth>
                                <FormLabel >Description</FormLabel>
                                <ReactQuill
                                    label="Description"
                                    value={description}
                                    onChange={setDescription}
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link', 'image', 'video'],
                                            ['clean']
                                        ],
                                    }}
                                    formats={[
                                        'bold', 'italic', 'underline', 'strike',
                                        'list', 'bullet',
                                        'link', 'image'
                                    ]}
                                />
                                <div className={classes.helperTextStyle}>{error.description}</div>
                            </FormControl>

                        </Grid>
                        <Grid size={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FormLabel style={{ marginRight: 'auto' }}>Quality</FormLabel>
                            <FormControl error={error.quality} onFocus={() => handleErrorMessage('quality', null)}  >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={quality}
                                    onChange={(e) => setQuality(e.target.value)}>
                                    <FormControlLabel name="quality" value="480P" control={<Radio />} label="480P" />
                                    <FormControlLabel name="quality" value="720P" control={<Radio />} label="720P" />
                                    <FormControlLabel name="quality" value="1080P" control={<Radio />} label="1080P" />
                                    <FormControlLabel name="quality" value="4K" control={<Radio />} label="4K" />
                                </RadioGroup>
                                <FormHelperText fullWidth>{error.quality}</FormHelperText>
                            </FormControl>
                        </Grid>
                        {handleQuality()}
                        <Grid size={6}>
                            <Button variant="contained" onClick={handleClick} fullWidth>Submit</Button>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
    const pictureForm = () => {

    }

    const handleReset = () => {
        setCategoryId('');
        setName('');
        setYear('');
        setSelectedLanguage([]);
        setSelectedGenres([]);
        setDescription('');
        setQuality('');
        setLink480P('');
        setSize480P('');
        setLink720P('');
        setSize720P('');
        setLink1080P('');
        setSize1080P('');
        setLink4k('');
        setSize4k('');
        setImage({ filename: '/film.png', bytes: '' });
        setScreenshot([]);

    };

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
                                title: 'Sizes', width: '5%', render: (rowData) =>
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
                                tooltip: 'Edit Movies',
                                onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
                            },
                            {
                                icon: () => <DeleteIcon />,
                                tooltip: 'Delete Movie',
                                onClick: (event, rowData) => alert("Delete movie: " + rowData.name)
                            },
                            {
                                icon: () => <AddIcon />,
                                tooltip: 'Add New Movie',
                                isFreeAction: true,
                                onClick: () => navigate('/movieinterface')
                            }
                        ]}

                    />
                </div>
            </div>
        );
    }
    return (
        <div>
            <div>
                {DisplayAll()}
            </div>
            {openDialog()}
        </div>
    )
}