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
    const [screenshot, setScreenshot] = useState([])
    const [image, setImage] = useState({ filename: '/film.png', bytes: '' })
    const [quality, setQuality] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [languagesList, setLanguagesList] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [contentType, setContentType] = useState("movie");
    const [error, setError] = useState({})

    // Updated season-based state variables with per-season zip link
    const [numberOfSeasons, setNumberOfSeasons] = useState([]);
    const [seasonsData, setSeasonsData] = useState([]);

    const handleGenreChange = (event) => {
        const value = event.target.name;
        if (selectedGenres.includes(value)) {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        } else {
            setSelectedGenres([...selectedGenres, value]);
        }
    };

    const handleLanguageChange = (e) => {
        const value = e.target.name;
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

    const fetchAllGeneres = async () => {
        var res = await getData("category/fetch_genres")
        setGenreList(res.data)
    }

    const fetchAllLanguages = async () => {
        var res = await getData("category/fetch_languages")
        setLanguagesList(res.data)
    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllGeneres()
        fetchAllLanguages()
    }, [])

    const fillCategory = () => {
        return (categoryList.map((item) => (
            <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        )))
    }

    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    // Handle number of seasons change
    const handleNumberOfSeasonsChange = (e) => {
        let val = e.target.value;
        if (!val || val < 1) {
            val = 1;
        } else {
            val = parseInt(val);
        }
        setNumberOfSeasons(val);

        // Initialize seasons data if needed
        let seasons = [...seasonsData];
        while (seasons.length < val) {
            seasons.push({
                seasonNumber: seasons.length + 1,
                numberOfEpisodes: 1,
                episodesLinks: [{}],
                zip: ''
            });
        }
        while (seasons.length > val) {
            seasons.pop();
        }
        setSeasonsData(seasons);
    }

    // Handle episodes per season change
    const handleEpisodesPerSeasonChange = (seasonIndex, numberOfEpisodes) => {
        let val = numberOfEpisodes;
        if (!val || val < 1) {
            val = 1;
        } else {
            val = parseInt(val);
        }
        let seasons = [...seasonsData];
        seasons[seasonIndex].numberOfEpisodes = val;

        // Initialize episodes for this season
        let episodes = [...(seasons[seasonIndex].episodesLinks || [])];
        while (episodes.length < val) {
            episodes.push({});
        }
        while (episodes.length > val) {
            episodes.pop();
        }
        seasons[seasonIndex].episodesLinks = episodes;
        setSeasonsData(seasons);
    }

    // Handle episode field change
    const handleEpisodeFieldChange = (seasonIndex, episodeIndex, field, value) => {
        let seasons = [...seasonsData];
        if (!seasons[seasonIndex].episodesLinks[episodeIndex]) {
            seasons[seasonIndex].episodesLinks[episodeIndex] = {};
        }
        seasons[seasonIndex].episodesLinks[episodeIndex][field] = value;
        setSeasonsData(seasons);
    }

    // Handle zip link change per season
    const handleSeasonZipChange = (seasonIndex, value) => {
        let seasons = [...seasonsData];
        seasons[seasonIndex].zip = value;
        setSeasonsData(seasons);
    }

    const handleClick = async () => {
        let err = false;
        if (categoryId.length === 0) {
            err = true;
            handleErrorMessage('categoryId', 'Please Select Category...');
        }
        if (name.length === 0) {
            err = true;
            handleErrorMessage('name', 'Please Input Name...');
        }
        if (year.length === 0) {
            err = true;
            handleErrorMessage('year', 'Please Input Year...');
        }
        if (title.length === 0) {
            err = true;
            handleErrorMessage('title', 'Please Input Title...');
        }
        if (selectedLanguage.length === 0) {
            err = true;
            handleErrorMessage('selectedLanguage', 'Please Select Language...');
        }
        if (selectedGenres.length === 0) {
            err = true;
            handleErrorMessage('selectedGenres', 'Please Select Genre...');
        }
        if (description.length === 0) {
            err = true;
            handleErrorMessage('description', 'Please Input Description...');
        }
        if (quality.length === 0) {
            err = true;
            handleErrorMessage('quality', 'Please Select Quality...');
        }
        if (image.bytes.length === 0) {
            err = true;
            handleErrorMessage("image", 'Please Select Image')
        }
        if (screenshot.length === 0) {
            err = true;
            handleErrorMessage('screenshot', 'Please Upload Screenshot')
        }

        // Validation for series with seasons
        if (contentType === "series") {
            for (let seasonIndex = 0; seasonIndex < numberOfSeasons; seasonIndex++) {
                const season = seasonsData[seasonIndex];
                if (!season) continue;

                // Validate zip link for season
                if (!season.zip || season.zip.trim() === '') {
                    err = true;
                    Swal.fire({
                        icon: 'error',
                        title: `Zip link is required for Season ${seasonIndex + 1}`
                    });
                    break;
                }

                for (let episodeIndex = 0; episodeIndex < season.numberOfEpisodes; episodeIndex++) {
                    let episode = season.episodesLinks[episodeIndex] || {};
                    switch (quality) {
                        case "480P":
                            if (!episode.link480P || !episode.size480P) {
                                err = true;
                                Swal.fire({
                                    icon: 'error',
                                    title: `Season ${seasonIndex + 1}, Episode ${episodeIndex + 1} is missing 480P link or size!`
                                });
                                break;
                            }
                            break;
                        case "720P":
                            if (!episode.link480P || !episode.size480P || !episode.link720P || !episode.size720P) {
                                err = true;
                                Swal.fire({
                                    icon: 'error',
                                    title: `Season ${seasonIndex + 1}, Episode ${episodeIndex + 1} is missing 480P or 720P link or size!`
                                });
                                break;
                            }
                            break;
                        case "1080P":
                            if (!episode.link480P || !episode.size480P || !episode.link720P || !episode.size720P
                                || !episode.link1080P || !episode.size1080P) {
                                err = true;
                                Swal.fire({
                                    icon: 'error',
                                    title: `Season ${seasonIndex + 1}, Episode ${episodeIndex + 1} is missing one or more links or sizes for 480P, 720P or 1080P!`
                                });
                                break;
                            }
                            break;
                        case "4K":
                            if (!episode.link480P || !episode.size480P || !episode.link720P || !episode.size720P
                                || !episode.link1080P || !episode.size1080P || !episode.link4k || !episode.size4k) {
                                err = true;
                                Swal.fire({
                                    icon: 'error',
                                    title: `Season ${seasonIndex + 1}, Episode ${episodeIndex + 1} is missing one or more links or sizes for 480P, 720P, 1080P, or 4K!`
                                });
                                break;
                            }
                            break;
                        default:
                            break;
                    }
                    if (err) break;
                }
                if (err) break;
            }
        }

        if (!err) {
            const formData = new FormData();

            formData.append('categoryid', categoryId);
            formData.append('name', name);
            formData.append('year', year);
            formData.append('title', title);
            formData.append('language', selectedLanguage.join(', '));
            formData.append('genre', selectedGenres.join(', '));
            formData.append('description', description);
            formData.append('quality', quality);
            formData.append('content', contentType);

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
                // For series, send seasons data
                formData.append('seasonsData', JSON.stringify(seasonsData));
                formData.append('numberOfSeasons', numberOfSeasons);
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
                    title: "Movie/Series Register",
                    text: result.message,
                    toast: true
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Movie/Series Register",
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
        setNumberOfSeasons(1);
        setSeasonsData([]);
        setContentType('movie');
        setError({});
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
                    <img src="/film.png" style={{ width: 50, height: 'auto' }} alt="default" />
                </div>
            );
        }
        return screenshot.map((item, index) => {
            return (
                <div key={index} style={{ margin: 2 }}>
                    <img src={URL.createObjectURL(item)} style={{ width: 30, height: 30 }} alt={`screenshot-${index}`} />
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
                            label="Number of Seasons"
                            type="number"
                            value={numberOfSeasons}
                            onChange={handleNumberOfSeasonsChange}
                            inputProps={{ min: 1 }}
                            fullWidth
                            style={{ marginBottom: 10 }}
                        />
                    </Grid>

                    {/* Render seasons including new zip link input */}
                    {seasonsData.map((season, seasonIndex) => (
                        <div key={seasonIndex} style={{
                            width: '100%',
                            marginBottom: '30px',
                            border: '2px solid #2196F3',
                            borderRadius: '8px',
                            padding: '15px',
                            backgroundColor: '#f5f5f5'
                        }}>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                color: '#2196F3'
                            }}>
                                Season {seasonIndex + 1}
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <TextField
                                    label={`Zip Link for Season ${seasonIndex + 1}`}
                                    value={season.zip || ''}
                                    onChange={(e) => handleSeasonZipChange(seasonIndex, e.target.value)}
                                    fullWidth
                                    style={{ marginBottom: 10 }}
                                />
                                <TextField
                                    label={`Number of Episodes in Season ${seasonIndex + 1}`}
                                    type="number"
                                    value={season.numberOfEpisodes}
                                    onChange={(e) => handleEpisodesPerSeasonChange(seasonIndex, e.target.value)}
                                    inputProps={{ min: 1 }}
                                    style={{ width: '300px' }}
                                />
                            </div>

                            {/* Render episodes for this season */}
                            {Array.from({ length: season.numberOfEpisodes }, (_, episodeIndex) => {
                                const fieldsByQuality = {
                                    '480P': ['link480P', 'size480P'],
                                    '720P': ['link480P', 'size480P', 'link720P', 'size720P'],
                                    '1080P': ['link480P', 'size480P', 'link720P', 'size720P', 'link1080P', 'size1080P'],
                                    '4K': ['link480P', 'size480P', 'link720P', 'size720P', 'link1080P', 'size1080P', 'link4k', 'size4k']
                                };
                                const fields = fieldsByQuality[quality] || [];

                                return (
                                    <div key={episodeIndex} style={{
                                        marginBottom: '15px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '10px',
                                        backgroundColor: 'white'
                                    }}>
                                        <div style={{
                                            fontWeight: 'bold',
                                            marginBottom: '10px',
                                            color: '#666'
                                        }}>
                                            Season {seasonIndex + 1} - Episode {episodeIndex + 1}:
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                            {fields.map(field => (
                                                <div key={field} style={{ flex: '1 1 250px', minWidth: '250px' }}>
                                                    <TextField
                                                        label={field.replace(/link|size/g, (m) => m.toUpperCase())}
                                                        value={(season.episodesLinks[episodeIndex] && season.episodesLinks[episodeIndex][field]) || ''}
                                                        onChange={(e) => handleEpisodeFieldChange(seasonIndex, episodeIndex, field, e.target.value)}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}

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
                        <div className={classes.name}>Add Movie Or Series</div>
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
                                        <input onChange={handleImageChange} onFocus={() => handleErrorMessage('image', '')} type="file" accept="image/*" hidden />
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
                                        {languagesList.map((item) => (
                                            <FormControlLabel
                                                key={item.languageid}
                                                control={
                                                    <Checkbox
                                                        checked={selectedLanguage.includes(item.language)}
                                                        onChange={handleLanguageChange}
                                                        name={item.language}
                                                    />
                                                }
                                                label={item.language}
                                            />
                                        ))}
                                    </FormGroup>
                                    <FormHelperText>{error.selectedLanguage}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid size={12}>
                                <FormControl error={error.selectedGenres} onFocus={() => handleErrorMessage('selectedGenres', null)} component="fieldset" fullWidth>
                                    <FormLabel component="legend">Genre</FormLabel>
                                    <FormGroup row>
                                        {genreList.map((item) => (
                                            <FormControlLabel
                                                key={item.genreid}
                                                control={
                                                    <Checkbox
                                                        checked={selectedGenres.includes(item.genre)}
                                                        onChange={handleGenreChange}
                                                        name={item.genre}
                                                    />
                                                }
                                                label={item.genre}
                                            />
                                        ))}
                                    </FormGroup>
                                    <FormHelperText>{error.selectedGenres}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid size={12} >
                                <TextField error={error.description} helperText={error.description} onFocus={() => handleErrorMessage('description', null)} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth></TextField>
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