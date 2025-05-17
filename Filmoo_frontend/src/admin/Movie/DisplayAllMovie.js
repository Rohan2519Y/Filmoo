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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
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

    const [movieId, setMovieId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [title,setTitle]=useState('')
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


    const languageList = [
        'Hindi', 'English', 'Tamil', 'Telgu', 'Gujarati', 'Marathi', 'Japanese', 'Chinese'
    ];
    const genresList = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Historical", "Horror", "Music", "Mystery",
        "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
    ];

    const handleGenreChange = (e) => {
        const value = e.target.name
        if (selectedGenres.includes(value)) {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        } else {
            var arr = []
            arr.push(...selectedGenres, value)
            setSelectedGenres(arr);
        }
    }
    const handleLanguageChange = (e) => {
        const value = e.target.name
        if (selectedLanguage.includes(value)) {
            setSelectedLanguage(selectedLanguage.filter((language) => language !== value));
        } else {
            var arr = []
            arr.push(...selectedLanguage, value)
            setSelectedLanguage(arr);
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
        if (state === 'screenshot') {
            // Initialize with existing screenshots from server
            const existingScreenshots = rowData.screenshot
                ? rowData.screenshot.split(',').map(item => item.trim())
                : [];
            setScreenshot(existingScreenshots);
        }
        setDialogState(state)
        setMovieId(rowData.movieid)
        setCategoryId(rowData.categoryid)
        setName(rowData.name)
        setYear(rowData.year)
        setTitle(rowData.title)
        setSelectedLanguage([])
        setSelectedGenres([])
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
        setImage({ filename: `${serverURL}/images/${rowData.image}`, bytes: '' })
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
        if (title.length == 0) {
            err = true
            handleErrorMessage('title', 'Please Input Title...')
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
                'movieid': movieId,
                'categoryid': categoryId,
                'name': name,
                'language': selectedLanguage,
                'year': year,
                'genre': selectedGenres,
                'description': description,
                'quality': quality,
                'link480p': link480P, 'link720p': link720P, 'link1080p': link1080P, 'link4k': link4k,
                'size480p': size480P, 'size720p': size720P, 'size1080p': size1080P, 'size4k': size4k,
                'title':title
            }
            var result = await postData('movie/edit_movies', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Movie Register",
                    text: result.message,
                    toast: true
                });
                fetchAllMovies();
                setOpen(false)
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
            <DialogContent>
                {dialogState === 'data' ? movieForm() : dialogState === 'image' ? pictureForm() : dialogState === 'screenshot' ? screenshotForm() : null}
            </DialogContent>

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
                        <Grid size={3}>
                            <FormControl error={error.categoryId} onFocus={() => handleErrorMessage('categoryId', null)} fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Category" >
                                    {fillCategory()}
                                </Select>
                                <FormHelperText>{error.categoryId}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid size={3}>
                            <TextField error={error.name} helperText={error.name} onFocus={() => handleErrorMessage('name', null)} label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField error={error.year} helperText={error.year} onFocus={() => handleErrorMessage('year', null)} label='Year' value={year} onChange={(e) => setYear(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField error={error.title} helperText={error.title} onFocus={() => handleErrorMessage('title', null)} label='Title' value={title} onChange={(e) => setTitle(e.target.value)} fullWidth></TextField>
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

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file })
            handleErrorMessage('image', null)
        }
    }
    const handleImageSave = async () => {

        var formData = new FormData()
        formData.append('movieid', movieId)
        formData.append('image', image.bytes)

        var result = await postData('movie/update_icon', formData)
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

    const pictureForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' />
                    <div className={classes.name}>Edit Image</div>
                    <img src="/verification.png" style={{ height: '8vh' }}></img>
                </div>
                <div style={{ margin: 10 }}>
                    <Grid container spacing={2}>
                        <Grid size={6}  >
                            <img style={{ margin: 0 }} src={image.filename} width={150} />
                        </Grid>
                        <Grid size={6}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onChange={handleImageChange} onFocus={() => handleErrorMessage(image, '')} type="file" accept="image/*" hidden multiple />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" onClick={handleImageSave} fullWidth>Submit</Button>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
    const handleRemoveScreenshot = (index) => {
        setScreenshot(prev => prev.filter((_, i) => i !== index));
    };
    const handleMultipleImage = (e) => {
        const newFiles = Array.from(e.target.files);
        // Replace existing screenshots with new ones
        setScreenshot(newFiles);
        handleErrorMessage('screenshot', null);
    };
    const showImage = () => {
        if (screenshot.length === 0) {
            return (
                <div style={{ margin: 2 }}>
                    <img src="/film.png" style={{ width: 50, height: 'auto' }} />
                </div>
            );
        }

        return (
            <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={164}>
                {screenshot.map((item, index) => {
                    const src = item instanceof File
                        ? URL.createObjectURL(item)
                        : `${serverURL}/images/${item}`;

                    return (
                        <ImageListItem key={index}>
                            <img
                                src={src}
                                alt={`screenshot-${index}`}
                                loading="lazy"
                                style={{ objectFit: 'cover' }}
                            />
                            <ImageListItemBar
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'white' }}
                                        onClick={() => handleRemoveScreenshot(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                actionPosition="right"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        );
    };
    const handleScreenshotSave = async () => {
        try {
            // 1. Validate movieId
            if (!movieId) {
                throw new Error('Movie ID is missing');
            }

            // 2. Prepare FormData
            const formData = new FormData();
            formData.append('movieid', movieId);

            // 3. Process screenshots
            const existingScreenshots = screenshot.filter(item => typeof item === 'string');
            const newScreenshots = screenshot.filter(item => item instanceof File);

            // 4. Add existing screenshots
            if (existingScreenshots.length > 0) {
                formData.append('existingScreenshots', existingScreenshots.join(','));
            }

            // 5. Add new screenshots
            newScreenshots.forEach(file => {
                formData.append('screenshots', file);
            });

            // 6. Make API call
            const result = await postData('movie/update_screenshots', formData);

            if (!result) {
                throw new Error('No response from server');
            }

            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: result.message || 'Screenshots updated',
                    toast: true
                });
                fetchAllMovies();
                setOpen(false);
            } else {
                throw new Error(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error("Upload error:", error);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: error.message || 'An unknown error occurred',
                toast: true
            });
        }
    };
    const screenshotForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' />
                    <div className={classes.name}>Edit ScreenShots</div>
                    <img src="/verification.png" style={{ height: '8vh' }}></img>
                </div>
                <div style={{ margin: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {showImage()}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                component="label"
                                variant="outlined"
                                startIcon={<AddIcon />}
                            >
                                Upload New ScreenShots
                                <input
                                    onFocus={() => handleErrorMessage(screenshot, '')}
                                    onChange={handleMultipleImage}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    multiple
                                />
                            </Button>
                            <FormHelperText error={!!error.screenshot}>
                                {error.screenshot || 'New uploads will replace existing screenshots'}
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                onClick={handleScreenshotSave}
                                fullWidth
                                disabled={screenshot.length === 0}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                onClick={handleCloseDialog}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    };


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
                <div style={{ padding: 10, margin: 10 }}>
                    <MaterialTable
                        title="Movie"
                        columns={[
                            { title: 'ID', field: 'movieid', width: '3%' },
                            { title: 'Category', field: 'categoryname', width: '7%' },
                            { title: 'Name', field: 'name', width: '5%' },
                            { title: 'Title', field: 'title', width: '10%' },
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
                            { title: 'Image', width: '4%', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'image')}><img src={`${serverURL}/images/${rowData.image}`} style={{ width: 40, height: 40, borderRadius: 10 }} /></div> },
                            {
                                title: 'Screenshots',
                                render: (rowData) => {
                                    const screenshots = typeof rowData.screenshot === 'string'
                                        ? rowData.screenshot.split(',').map(item => item.trim())
                                        : Array.isArray(rowData.screenshot)
                                            ? rowData.screenshot
                                            : [];

                                    return (
                                        <div style={{ cursor: 'pointer' }}
                                            onClick={() => handleOpenDialog(rowData, 'screenshot')}>
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