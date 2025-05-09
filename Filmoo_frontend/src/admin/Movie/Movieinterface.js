import { useStyles } from "./MovieinterfaceCss"
import { useEffect, useState } from "react";
import { FormGroup, Checkbox, Button, Grid, MenuItem, Radio, TextField, InputLabel, Select } from "@mui/material"
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { postData, getData } from "../../backendservices/FetchNodeServices";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Swal from "sweetalert2";
export default function MovieInterface() {
    const classes = useStyles()
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
    const genresList = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Historical", "Horror", "Music", "Mystery",
        "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
    ];
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
    const handleLanguageChange = (e) => {
        const value = e.target.name
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

    const handleClick = async () => {

        var err = false
        if(err==false){
        const formData = new FormData();

        formData.append('categoryid', categoryId);
        formData.append('name', name);
        formData.append('year', year);
        formData.append('language', selectedLanguage.join(','));
        formData.append('genre', selectedGenres.join(','));
        formData.append('description', description);
        formData.append('quality', quality);
        formData.append('link480p', link480P);
        formData.append('size480p', size480P);
        formData.append('link720p', link720P);
        formData.append('size720p', size720P);
        formData.append('link1080p', link1080P);
        formData.append('size1080p', size1080P);
        formData.append('link4k', link4k);
        formData.append('size4k', size4k);

        if (image.bytes) {
            formData.append('image', image.bytes);
        }
        screenshot.forEach((file, index) => {
            formData.append(`screenshot`, file);
        });
        const result = await postData('movie/insert_movies', formData)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: "Movie Register",
                text: result.message,
                toast: true
            });
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
    

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file })
        }
    }
    const handleMultipleImage = (e) => {
        var images = Object.values(e.target.files)
        setScreenshot(images.length > 0 ? images : []);
    }
    const showImage = () => {
        if (screenshot.length === 0) {
            return (
                <div style={{ margin: 2 }}>
                    <img src="/film.png" style={{ width: 50, height: 'auto' }} />
                </div>
            );
        }
        return screenshot.map((item) => {
            return (
                <div style={{ margin: 2 }}>
                    <img src={URL.createObjectURL(item)} style={{ width: 30, height: 30 }} />
                </div>
            );
        });
    }

    const handleQuality = () => {
        switch (quality) {
            case "480P":
                return (
                    <>
                        <Grid size={12}>
                            <TextField  onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField  onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )

            case "720P":
                return (
                    <>
                        <Grid size={6}>
                            <TextField  onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField  onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField  onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField  onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                    </>)

            case "1080P":
                return (
                    <>
                        <Grid size={4}>
                            <TextField  onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField  onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField  onChange={(e) => setLink1080P(e.target.value)} label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField  onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField  onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField  onChange={(e) => setSize1080P(e.target.value)} label='1080P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            case "4K":
                return (
                    <>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setLink1080P(e.target.value)} label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setLink4k(e.target.value)} label='4K Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setSize1080P(e.target.value)} label='1080P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField  onChange={(e) => setSize4k(e.target.value)} label='4K Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            default:
                return null;
        }
    }
    function DisplayAll(){
    return (

        <div className={classes.back}>
            <div className={classes.box}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' />
                    <div className={classes.name}>Add Movie</div>
                    <img src="/verification.png" style={{ height: '8vh' }}></img>
                </div>
                <div style={{ margin: 10 }}>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select  value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Category" >
                                    {fillCategory()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <TextField  label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField  label='Year' value={year} onChange={(e) => setYear(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={2}  >
                            <img style={{ margin: 0 }} src={image.filename} width={50} />
                        </Grid>
                        <Grid size={4}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                <Button  fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>

                            </div>
                        </Grid>
                        <Grid size={2} >
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {showImage()}
                            </div>
                        </Grid>
                        <Grid size={4}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                <Button  fullWidth component="label" variant="outlined">
                                    Upload ScreenShots
                                    <input onChange={handleMultipleImage} type="file" accept="image/*" hidden multiple />
                                </Button>
                            </div>
                        </Grid>
                        <Grid size={12}>
                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Language</FormLabel>
                                <FormGroup row>
                                    {languageList.map((language) => (
                                        <FormControlLabel key={language} control={<Checkbox  checked={selectedLanguage.includes(language)} onChange={handleLanguageChange} name={language} />}
                                            label={language}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Genre</FormLabel>
                                <FormGroup row>
                                    {genresList.map((genre) => (
                                        <FormControlLabel key={genre} control={<Checkbox  checked={selectedGenres.includes(genre)} onChange={handleGenreChange} name={genre} />}
                                            label={genre}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid size={12} >
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
                        </Grid>
                        <Grid size={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FormLabel style={{ marginRight: 'auto' }}>Quality</FormLabel>
                            <FormControl >
                                <RadioGroup 
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={quality}
                                    onChange={(e) => setQuality(e.target.value)}
                                >
                                    <FormControlLabel name="quality" value="480P" control={<Radio />} label="480P" />
                                    <FormControlLabel name="quality" value="720P" control={<Radio />} label="720P" />
                                    <FormControlLabel name="quality" value="1080P" control={<Radio />} label="1080P" />
                                    <FormControlLabel name="quality" value="4K" control={<Radio />} label="4K" />
                                </RadioGroup>
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
        </div>
    )}

    return(
        <div>
            {DisplayAll()}
        </div>
    )
}