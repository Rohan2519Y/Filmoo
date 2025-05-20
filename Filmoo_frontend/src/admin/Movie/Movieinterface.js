import { useStyles } from "./MovieinterfaceCss"
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FormGroup, Checkbox, Button, Grid, MenuItem, Radio, TextField, InputLabel, Select } from "@mui/material"
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { postData, getData } from "../../backendservices/FetchNodeServices";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Swal from "sweetalert2";
export default function MovieInterface() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [categoryId, setCategoryId] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [title, setTitle] = useState('')
    const [link480P, setLink480P] = useState('')
    const [size480P, setSize480P] = useState('')
    const [link720P, setLink720P] = useState('')
    const [size720P, setSize720P] = useState('')
    const [link1080P, setLink1080P] = useState('')
    const [size1080P, setSize1080P] = useState('')
    const [link4k, setLink4k] = useState('')
    const [size4k, setSize4k] = useState('')
    const [description, setDescription] = useState('')
    const [zip, setZip] = useState('')
    const [screenshot, setScreenshot] = useState([])
    const [image, setImage] = useState({ filename: '/film.png', bytes: '' })
    const [quality, setQuality] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [contentType, setContentType] = useState("movie");
    const [error, setError] = useState({})
    
    const [numberOfEpisodes, setNumberOfEpisodes] = useState(1);
    const [episodesLinks, setEpisodesLinks] = useState([]);

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
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        }))
    }

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    const handleNumberOfEpisodesChange = (e) => {
        let val = e.target.value;
        if (!val || val < 1) {
            val = 1;
        } else {
            val = parseInt(val);
        }
        setNumberOfEpisodes(val);
        let arr = [...episodesLinks];
        while (arr.length < val) arr.push({});
        while (arr.length > val) arr.pop();
        setEpisodesLinks(arr);
    }
    
    const handleEpisodeFieldChange = (index, field, value) => {
        let arr = [...episodesLinks];
        if (!arr[index]) arr[index] = {};
        arr[index][field] = value;
        setEpisodesLinks(arr);
    }
    // --- End ---

    const handleClick = async () => {

        let err = false
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
        if (image.bytes.length == 0) {
            err = true
            handleErrorMessage("image", 'Please Select Image')
        }
        if (screenshot.length == 0) {
            err = true
            handleErrorMessage('screenshot', 'Please Upload Screenshot')
        }

        // Validation for series episodes links/sizes
        if (contentType === "series") {
            for (let i = 0; i < numberOfEpisodes; i++) {
                let ep = episodesLinks[i] || {};
                switch (quality) {
                    case "480P":
                        if (!ep.link480P || !ep.size480P) {
                            err = true;
                            Swal.fire({
                                icon: 'error',
                                title: `Episode ${i + 1} is missing 480P link or size!`
                            });
                            break;
                        }
                        break;
                    case "720P":
                        if (!ep.link480P || !ep.size480P || !ep.link720P || !ep.size720P) {
                            err = true;
                            Swal.fire({
                                icon: 'error',
                                title: `Episode ${i + 1} is missing 480P or 720P link or size!`
                            });
                            break;
                        }
                        break;
                    case "1080P":
                        if (!ep.link480P || !ep.size480P || !ep.link720P || !ep.size720P
                            || !ep.link1080P || !ep.size1080P) {
                            err = true;
                            Swal.fire({
                                icon: 'error',
                                title: `Episode ${i + 1} is missing one or more links or sizes for 480P, 720P or 1080P!`
                            });
                            break;
                        }
                        break;
                    case "4K":
                        if (!ep.link480P || !ep.size480P || !ep.link720P || !ep.size720P
                            || !ep.link1080P || !ep.size1080P || !ep.link4k || !ep.size4k) {
                            err = true;
                            Swal.fire({
                                icon: 'error',
                                title: `Episode ${i + 1} is missing one or more links or sizes for 480P, 720P, 1080P, or 4K!`
                            });
                            break;
                        }
                        break;
                    default:
                        break;
                }
                if (err) break;
            }
        }

        if (err == false) {
            const formData = new FormData();

            formData.append('categoryid', categoryId);
            formData.append('name', name);
            formData.append('year', year);
            formData.append('title', title);
            formData.append('language', selectedLanguage.join(', '));
            formData.append('genre', selectedGenres.join(', '));
            formData.append('description', description);
            formData.append('quality', quality);
            
            // For movie normal quality inputs
            if (contentType !== "series") {
                formData.append('link480p', link480P);
                formData.append('size480p', size480P);
                formData.append('link720p', link720P);
                formData.append('size720p', size720P);
                formData.append('link1080p', link1080P);
                formData.append('size1080p', size1080P);
                formData.append('link4k', link4k);
                formData.append('size4k', size4k);
            } else {
                // Append episodes links JSON for series
                formData.append('episodesLinks', JSON.stringify(episodesLinks));
                formData.append('numberOfEpisodes', numberOfEpisodes);
            }

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
        setTitle('');
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
        setNumberOfEpisodes(1);
        setEpisodesLinks([]);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file })
            handleErrorMessage('image', null)
        }
    }
    const handleMultipleImage = (e) => {
        var images = Object.values(e.target.files)
        setScreenshot(images.length > 0 ? images : []);
        handleErrorMessage('screenshot', null)
    }
    const showImage = () => {
        if (screenshot.length === 0) {
            return (
                <div style={{ margin: 2 }}>
                    <img src="/film.png" style={{ width: 50, height: 'auto' }} />
                </div>
            );
        }
        return screenshot.map((item, index) => {
            return (
                <div key={index} style={{ margin: 2 }}>
                    <img src={URL.createObjectURL(item)} style={{ width: 30, height: 30 }} />
                </div>
            );
        });
    }

    const handleQuality = () => {
        if (contentType === "series") {
            return (
                <>
                    <Grid size={3}>
                        <TextField
                            label="Number of Episodes"
                            type="number"
                            value={numberOfEpisodes}
                            onChange={handleNumberOfEpisodesChange}
                            inputProps={{ min: 1 }}
                            fullWidth
                            style={{ marginBottom: 10 }}
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            label="Zip link"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            fullWidth
                            style={{ marginBottom: 10 }}
                        />
                    </Grid>
                    {
                        Array.from({ length: numberOfEpisodes }, (_, idx) => {
                            // which fields to show per quality
                            const fieldsByQuality = {
                                '480P': ['link480P', 'size480P'],
                                '720P': ['link480P', 'size480P', 'link720P', 'size720P'],
                                '1080P': ['link480P', 'size480P', 'link720P', 'size720P', 'link1080P', 'size1080P'],
                                '4K': ['link480P', 'size480P', 'link720P', 'size720P', 'link1080P', 'size1080P', 'link4k', 'size4k']
                            };
                            const fields = fieldsByQuality[quality] || [];
                            return (
                                <div key={idx} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px',display:'flex' }}>
                                    <div>Episode {idx + 1}:</div>
                                    {fields.map(field => (
                                        <Grid size={4} key={field} style={{ marginTop: 10 }}>
                                            <TextField
                                                label={field.replace(/link|size/g, (m) => m.toUpperCase())}
                                                value={(episodesLinks[idx] && episodesLinks[idx][field]) || ''}
                                                onChange={(e) => handleEpisodeFieldChange(idx, field, e.target.value)}
                                                fullWidth
                                            />
                                        </Grid>
                                    ))}
                                </div>
                            )
                        })
                    }
                </>
            )
        } 

        // for non-series content type, keep your existing quality inputs:
        switch (quality) {
            case "480P":
                return (
                    <>
                        <Grid size={12}>
                            <TextField onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )

            case "720P":
                return (
                    <>
                        <Grid size={6}>
                            <TextField onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
                            <TextField onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                    </>)

            case "1080P":
                return (
                    <>
                        <Grid size={4}>
                            <TextField onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField onChange={(e) => setLink1080P(e.target.value)} label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={4}>
                            <TextField onChange={(e) => setSize1080P(e.target.value)} label='1080P Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            case "4K":
                return (
                    <>
                        <Grid size={3}>
                            <TextField onChange={(e) => setLink480P(e.target.value)} label='480P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setLink720P(e.target.value)} label='720P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setLink1080P(e.target.value)} label='1080P Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setLink4k(e.target.value)} label='4K Link' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setSize480P(e.target.value)} label='480P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setSize720P(e.target.value)} label='720P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setSize1080P(e.target.value)} label='1080P Size' fullWidth></TextField>
                        </Grid>
                        <Grid size={3}>
                            <TextField onChange={(e) => setSize4k(e.target.value)} label='4K Size' fullWidth></TextField>
                        </Grid>
                    </>
                )
            default:
                return null;
        }
    }

    

    function DisplayAll() {
        return (
            <div className={classes.back}>
                <div className={classes.box}>
                    <div className={classes.title}>
                        <img className={classes.image} src='/logo.png' alt="logo" />
                        <div className={classes.name}>Add Movie</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate("/displayallmovie")}>
                            <img src="/verification.png" alt="navigate" style={{ height: '8vh' }} />
                        </div>
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
                            <Grid size={2}  >
                                <img style={{ margin: 0 }} src={image.filename} width={50} alt="preview" />
                            </Grid>
                            <Grid size={4}  >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                    <Button fullWidth component="label" variant="outlined">
                                        Upload Image
                                        <input onChange={handleImageChange} onFocus={() => handleErrorMessage('image', '')} type="file" accept="image/*" hidden multiple />
                                    </Button>
                                    <div className={classes.helperTextStyle}>{error.image}</div>
                                </div>
                            </Grid>
                            <Grid size={2} >
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {showImage()}
                                </div>
                            </Grid>
                            <Grid size={4}  >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                    <Button fullWidth component="label" variant="outlined">
                                        Upload ScreenShots
                                        <input onFocus={() => handleErrorMessage('screenshot', '')} onChange={handleMultipleImage} type="file" accept="image/*" hidden multiple />
                                    </Button>
                                    <div className={classes.helperTextStyle}>{error.screenshot}</div>
                                </div>
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
                            <Grid size={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Content Type</FormLabel>
                                    <RadioGroup
                                        row
                                        value={contentType}
                                        onChange={(e) => setContentType(e.target.value)}
                                    >
                                        <FormControlLabel value="movie" control={<Radio />} label="Movie" />
                                        <FormControlLabel value="series" control={<Radio />} label="Series" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid size={8}>
                                <FormControl error={error.quality} onFocus={() => handleErrorMessage('quality', null)} fullWidth>
                                    <FormLabel>Quality</FormLabel>
                                    <RadioGroup row value={quality} onChange={(e) => setQuality(e.target.value)}>
                                        <FormControlLabel value="480P" control={<Radio />} label="480P" />
                                        <FormControlLabel value="720P" control={<Radio />} label="720P" />
                                        <FormControlLabel value="1080P" control={<Radio />} label="1080P" />
                                        <FormControlLabel value="4K" control={<Radio />} label="4K" />
                                    </RadioGroup>
                                    <FormHelperText>{error.quality}</FormHelperText>
                                </FormControl>
                            </Grid>

                            {/* Render quality inputs based on selected contentType */}
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
        )
    }

    return (
        <div>
            {DisplayAll()}
        </div>
    )
}

