import { useStyles } from "./MovieinterfaceCss"
import { useEffect, useState } from "react";
import {FormGroup,Checkbox, Button, Grid, MenuItem, Radio, TextField, InputLabel, Select } from "@mui/material"
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { postData,getData } from "../../backendservices/FetchNodeServices";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function MovieInterface() {
    const classes = useStyles()
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [screenshot,setScreenshot]=useState([])
    const [image,setImage]=useState({filename:'/film.png',bytes:''})
    const [quality, setQuality] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);
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

    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            setImage({filename:URL.createObjectURL(file),bytes:file})
        }
    }
    const handleMultipleImage=(e)=>{
        var images=Object.values(e.target.files)
        setScreenshot(images.length > 0 ? images : []);
    }
    const showImage=()=>{
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
                            <TextField size="small" label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField size="small" label='480P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )

            case "720P":
                return (
                    <>
                        <Grid size={6}>
                            <TextField size="small" label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField size="small" label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField size="small" label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField size="small" label='720P Size' fullWidth></TextField>
                        </Grid>
                    </>)

            case "1080P":
                return (
                    <>
                        <Grid size={4}>
                            <TextField size="small" label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField size="small" label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField size="small" label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField size="small" label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField size="small" label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField size="small" label='1080P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            case "4K":
                return (
                    <>
                        <Grid size={3}>
                            <TextField size="small" label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='4K Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='1080P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField size="small" label='4K Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            default:
                return null;
        }
    }
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
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select size="small" value={category} onChange={(e) => setCategory(e.target.value)} label="Category" >
                                    {fillCategory()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <TextField size="small" label="Name" fullWidth></TextField>
                        </Grid>
                        
                        <Grid size={6}>
                            <TextField size="small" label='Language' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField size="small" label='Year' fullWidth></TextField>
                        </Grid>
                        <Grid size={2}  >
                            <img style={{margin:0}} src={image.filename} width={50} />
                        </Grid>
                        <Grid size={4}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                <Button size="small" fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                                </Button>
                                
                            </div>
                        </Grid>
                        <Grid size={2} >
                          <div style={{display:'flex',flexWrap:'wrap'}}>
                            {showImage()}
                          </div>
                        </Grid>
                        <Grid size={4}  >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                <Button size="small" fullWidth component="label" variant="outlined">
                                    Upload ScreenShots
                                    <input onChange={handleMultipleImage} type="file" accept="image/*" hidden multiple />
                                </Button>   
                            </div>
                        </Grid>
                        <Grid size={12}>
                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Genre</FormLabel>
                                <FormGroup row>
                                    {genresList.map((genre) => (
                                        <FormControlLabel
                                            key={genre}
                                            control={
                                                <Checkbox size="small"
                                                    checked={selectedGenres.includes(genre)}
                                                    onChange={handleGenreChange}
                                                    name={genre}
                                                />
                                            }
                                            label={genre}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid size={12} >
                            <FormLabel >Description</FormLabel>
                            <ReactQuill size="small"
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
                                <RadioGroup size="small"
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
                            <Button variant="contained" fullWidth>Submit</Button>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}