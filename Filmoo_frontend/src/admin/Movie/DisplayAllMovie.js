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
import { Dialog, DialogActions, DialogContent } from "@mui/material";
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
    const [contentType, setContentType] = useState('');

    // Updated states for season management with per-season zip
    const [numberOfSeasons, setNumberOfSeasons] = useState(1);
    const [seasonsData, setSeasonsData] = useState([]);

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

    const fetchAllGenres = async () => {
        var response = await getData('category/fetch_genres')
        if (response.status) {
            setGenreList(response.data)
        }
    }

    const fetchAllLanguages = async () => {
        var response = await getData('category/fetch_languages')
        if (response.status) {
            setLanguagesList(response.data)
        }
    }

    useEffect(function () {
        fetchAllMovies()
        fetchAllCategory()
        fetchAllGenres()
        fetchAllLanguages()
    }, [])

    const deleteUsingIcon = (rowData) => {
        Swal.fire({
            title: "Are you sure to delete selected Movie or Series",
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(rowData.movieid);
            }
        });
    }

    const handleDelete = async (id) => {
        if (!id) return;
        var body = { 'movieid': id }
        var result = await postData('movie/delete_movie', body)
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

    const handleGenreChange = (e) => {
        const value = e.target.name
        if (selectedGenres.includes(value)) {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        } else {
            setSelectedGenres(prev => [...prev, value]);
        }
    }

    const handleLanguageChange = (e) => {
        const value = e.target.name
        if (selectedLanguage.includes(value)) {
            setSelectedLanguage(selectedLanguage.filter((language) => language !== value));
        } else {
            setSelectedLanguage(prev => [...prev, value]);
        }
    }

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_categories")
        setCategoryList(res.data)
    }

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

    // Handle episodes count per season
    const handleEpisodesPerSeasonChange = (seasonIndex, numberOfEpisodes) => {
        let val = numberOfEpisodes;
        if (!val || val < 1) {
            val = 1;
        } else {
            val = parseInt(val);
        }

        let seasons = [...seasonsData];
        seasons[seasonIndex].numberOfEpisodes = val;

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

    // Handle per-season zip change
    const handleSeasonZipChange = (seasonIndex, value) => {
        let seasons = [...seasonsData];
        seasons[seasonIndex].zip = value;
        setSeasonsData(seasons);
    }

    const handleOpenDialog = (rowData, state) => {
        // Parse and set seasonsData if available
        if (rowData.seasonsData) {
            try {
                let seasons = typeof rowData.seasonsData === 'string'
                    ? JSON.parse(rowData.seasonsData)
                    : rowData.seasonsData;

                // Ensure each season has a zip property
                seasons = seasons.map(season => ({
                    ...season,
                    zip: season.zip || '' // Initialize zip if missing
                }));

                if (Array.isArray(seasons)) {
                    setSeasonsData(seasons)
                    setNumberOfSeasons(seasons.length > 0 ? seasons.length : 1)
                }
            } catch (error) {
                console.error('Error parsing seasonsData:', error);
                setSeasonsData([]);
                setNumberOfSeasons(1);
            }
        } else {
            setSeasonsData([]);
            setNumberOfSeasons(1);
        }

        setDialogState(state)
        setMovieId(rowData.movieid)
        setCategoryId(rowData.categoryid)
        setName(rowData.name)
        setYear(rowData.year)
        setTitle(rowData.title)
        setSelectedLanguage(rowData.language ? (Array.isArray(rowData.language) ? rowData.language : rowData.language.split(',').map(l => l.trim())) : [])
        setSelectedGenres(rowData.genre ? (Array.isArray(rowData.genre) ? rowData.genre : rowData.genre.split(',').map(g => g.trim())) : [])
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
        setContentType(rowData.content)
        setImage({ filename: `${serverURL}/images/${rowData.image}`, bytes: '' })
        setScreenshot(rowData.screenshot ? (typeof rowData.screenshot === 'string' ? rowData.screenshot.split(',').map(item => item.trim()) : rowData.screenshot) : [])
        setOpen(true)
    }

    const handleClick = async () => {
        // Initialize error tracking
        let hasError = false;
        const newErrors = {};

        // Basic field validations
        if (!categoryId) {
            newErrors.categoryId = 'Please select a category';
            hasError = true;
        }
        if (!name.trim()) {
            newErrors.name = 'Please enter a name';
            hasError = true;
        }
        if (!year.trim()) {
            newErrors.year = 'Please enter a year';
            hasError = true;
        }
        if (!title.trim()) {
            newErrors.title = 'Please enter a title';
            hasError = true;
        }
        if (selectedLanguage.length === 0) {
            newErrors.selectedLanguage = 'Please select at least one language';
            hasError = true;
        }
        if (selectedGenres.length === 0) {
            newErrors.selectedGenres = 'Please select at least one genre';
            hasError = true;
        }
        if (!description.trim()) {
            newErrors.description = 'Please enter a description';
            hasError = true;
        }
        if (!quality) {
            newErrors.quality = 'Please select a quality';
            hasError = true;
        }
        if (!contentType) {
            newErrors.contentType = 'Please select content type (Movie/Series)';
            hasError = true;
        }

        // Content type specific validations
        if (contentType === "series") {
            // Validate each season
            for (let seasonIndex = 0; seasonIndex < numberOfSeasons; seasonIndex++) {
                const season = seasonsData[seasonIndex] || {};

                // Validate episodes based on selected quality
                for (let episodeIndex = 0; episodeIndex < (season.numberOfEpisodes || 1); episodeIndex++) {
                    const episode = (season.episodesLinks && season.episodesLinks[episodeIndex]) || {};
                    let missingFields = [];

                    // Check required fields based on quality
                    if (quality === "480P" && (!episode.link480P || !episode.size480P)) {
                        missingFields.push('480P link/size');
                    }
                    if (quality === "720P" && (!episode.link720P || !episode.size720P)) {
                        missingFields.push('720P link/size');
                    }
                    if (quality === "1080P" && (!episode.link1080P || !episode.size1080P)) {
                        missingFields.push('1080P link/size');
                    }
                    if (quality === "4K" && (!episode.link4k || !episode.size4k)) {
                        missingFields.push('4K link/size');
                    }

                    if (missingFields.length > 0) {
                        hasError = true;
                        await Swal.fire({
                            icon: 'error',
                            title: `Validation Error`,
                            html: `Season ${seasonIndex + 1}, Episode ${episodeIndex + 1} is missing:<br>${missingFields.join('<br>')}`,
                        });
                        break;
                    }
                }
                if (hasError) break;
            }
        } else {
            // Movie quality validations
            const missingFields = [];
            if (quality === "480P" && (!link480P || !size480P)) {
                missingFields.push('480P link/size');
            }
            if (["720P", "1080P", "4K"].includes(quality) && (!link720P || !size720P)) {
                missingFields.push('720P link/size');
            }
            if (["1080P", "4K"].includes(quality) && (!link1080P || !size1080P)) {
                missingFields.push('1080P link/size');
            }
            if (quality === "4K" && (!link4k || !size4k)) {
                missingFields.push('4K link/size');
            }

            if (missingFields.length > 0) {
                hasError = true;
                await Swal.fire({
                    icon: 'error',
                    title: `Validation Error`,
                    html: `Missing required fields:<br>${missingFields.join('<br>')}`,
                });
            }
        }

        // Update errors state
        setError(newErrors);

        // If no errors, proceed with submission
        if (!hasError) {
            try {
                const formData = new FormData();

                // Add basic fields
                formData.append('movieid', movieId);
                formData.append('categoryid', categoryId);
                formData.append('name', name);
                formData.append('year', year);
                formData.append('title', title);
                formData.append('language', selectedLanguage.join(', '));
                formData.append('genre', selectedGenres.join(', '));
                formData.append('description', description);
                formData.append('quality', quality);
                formData.append('content', contentType);

                // Handle image upload
                if (image.bytes) {
                    formData.append('image', image.bytes);
                } else if (image.filename && image.filename.startsWith(serverURL)) {
                    // Keep existing image if no new one uploaded
                    const existingImage = image.filename.split('/').pop();
                    formData.append('existingImage', existingImage);
                }

                // Handle screenshots
                const existingScreenshots = screenshot.filter(item => typeof item === 'string');
                const newScreenshots = screenshot.filter(item => item instanceof File);

                if (existingScreenshots.length > 0) {
                    formData.append('existingScreenshots', existingScreenshots.join(','));
                }
                newScreenshots.forEach(file => {
                    formData.append('screenshot', file);
                });

                // Handle content type specific data
                if (contentType === "series") {
                    // Prepare seasons data with zip links
                    const processedSeasons = seasonsData.map((season, index) => ({
                        seasonNumber: index + 1,
                        numberOfEpisodes: season.numberOfEpisodes || 1,
                        zip: season.zip || '',
                        episodesLinks: (season.episodesLinks || []).map(episode => ({
                            link480P: episode.link480P || '',
                            size480P: episode.size480P || '',
                            link720P: episode.link720P || '',
                            size720P: episode.size720P || '',
                            link1080P: episode.link1080P || '',
                            size1080P: episode.size1080P || '',
                            link4k: episode.link4k || '',
                            size4k: episode.size4k || ''
                        }))
                    }));

                    formData.append('seasonsData', JSON.stringify(processedSeasons));
                    formData.append('numberOfSeasons', numberOfSeasons);
                } else {
                    // Add movie quality links
                    formData.append('link480p', link480P);
                    formData.append('size480p', size480P);
                    formData.append('link720p', link720P);
                    formData.append('size720p', size720P);
                    formData.append('link1080p', link1080P);
                    formData.append('size1080p', size1080P);
                    formData.append('link4k', link4k);
                    formData.append('size4k', size4k);
                }

                // Show loading indicator
                Swal.fire({
                    title: 'Saving...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Submit to backend
                const result = await postData('movie/edit_movies', formData);

                Swal.close();
                if (result.status) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `${contentType === 'series' ? 'Series' : 'Movie'} updated successfully!`,
                    });
                    fetchAllMovies();
                    setOpen(false);
                } else {
                    throw new Error(result.message || 'Update failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: error.message || 'An error occurred while saving. Please try again.',
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
        setContentType('');
        setError({});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage({ filename: URL.createObjectURL(file), bytes: file });
            handleErrorMessage('image', null);
        }
    };

    const handleMultipleImage = (e) => {
        const images = Array.from(e.target.files);
        setScreenshot(images.length > 0 ? images : []);
        handleErrorMessage('screenshot', null);
    };

    const showImage2 = () => {
        if (screenshot.length === 0) {
            return (
                <div style={{ margin: 2 }}>
                    <img src="/film.png" style={{ width: 50, height: 'auto' }} alt="default" />
                </div>
            );
        }
        return screenshot.map((item, index) => (
            <div key={index} style={{ margin: 2 }}>
                <img
                    src={item instanceof File ? URL.createObjectURL(item) : `${serverURL}/images/${item}`}
                    style={{ width: 30, height: 30 }}
                    alt={`screenshot-${index}`}
                />
            </div>
        ));
    };

    const handleQualityInputs = () => {
        if (contentType === "series") {
            return (
                <>
                    <Grid item xs={12}>
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

                            {/* Zip Link Input for the Season */}
                            <div style={{ marginBottom: '15px' }}>
                                <TextField
                                    label={`Zip Link for Season ${seasonIndex + 1}`}
                                    value={season.zip || ''}
                                    onChange={(e) => handleSeasonZipChange(seasonIndex, e.target.value)}
                                    fullWidth
                                    style={{ marginBottom: 10 }}
                                    required
                                />
                                <TextField
                                    label={`Number of Episodes in Season ${seasonIndex + 1}`}
                                    type="number"
                                    value={season.numberOfEpisodes || 1}
                                    onChange={(e) => handleEpisodesPerSeasonChange(seasonIndex, e.target.value)}
                                    inputProps={{ min: 1 }}
                                    style={{ width: '300px' }}
                                />
                            </div>

                            {Array.from({ length: season.numberOfEpisodes || 1 }, (_, episodeIndex) => {
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
                                                        label={field.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
                                                        value={(season.episodesLinks && season.episodesLinks[episodeIndex] && season.episodesLinks[episodeIndex][field]) || ''}
                                                        onChange={(e) => handleEpisodeFieldChange(seasonIndex, episodeIndex, field, e.target.value)}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </>
            );
        }

        // For movies, show quality inputs
        switch (quality) {
            case "480P":
                return (
                    <>
                        <Grid item xs={12}>
                            <TextField
                                value={link480P}
                                onChange={e => setLink480P(e.target.value)}
                                label="480P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={size480P}
                                onChange={e => setSize480P(e.target.value)}
                                label="480P Size"
                                fullWidth
                            />
                        </Grid>
                    </>
                );
            case "720P":
                return (
                    <>
                        <Grid item xs={6}>
                            <TextField
                                value={link480P}
                                onChange={e => setLink480P(e.target.value)}
                                label="480P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={link720P}
                                onChange={e => setLink720P(e.target.value)}
                                label="720P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={size480P}
                                onChange={e => setSize480P(e.target.value)}
                                label="480P Size"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={size720P}
                                onChange={e => setSize720P(e.target.value)}
                                label="720P Size"
                                fullWidth
                            />
                        </Grid>
                    </>
                );
            case "1080P":
                return (
                    <>
                        <Grid item xs={4}>
                            <TextField
                                value={link480P}
                                onChange={e => setLink480P(e.target.value)}
                                label="480P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={link720P}
                                onChange={e => setLink720P(e.target.value)}
                                label="720P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={link1080P}
                                onChange={e => setLink1080P(e.target.value)}
                                label="1080P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={size480P}
                                onChange={e => setSize480P(e.target.value)}
                                label="480P Size"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={size720P}
                                onChange={e => setSize720P(e.target.value)}
                                label="720P Size"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={size1080P}
                                onChange={e => setSize1080P(e.target.value)}
                                label="1080P Size"
                                fullWidth
                            />
                        </Grid>
                    </>
                );
            case "4K":
                return (
                    <>
                        <Grid item xs={3}>
                            <TextField
                                value={link480P}
                                onChange={e => setLink480P(e.target.value)}
                                label="480P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={link720P}
                                onChange={e => setLink720P(e.target.value)}
                                label="720P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={link1080P}
                                onChange={e => setLink1080P(e.target.value)}
                                label="1080P Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={link4k}
                                onChange={e => setLink4k(e.target.value)}
                                label="4K Link"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={size480P}
                                onChange={e => setSize480P(e.target.value)}
                                label="480P Size"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={size720P}
                                onChange={e => setSize720P(e.target.value)}
                                label="720P Size"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={size1080P}
                                onChange={e => setSize1080P(e.target.value)}
                                label="1080P Size"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={size4k}
                                onChange={e => setSize4k(e.target.value)}
                                label="4K Size"
                                fullWidth
                            />
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

    const openDialog = () => {
        return (
            <Dialog open={open} fullWidth maxWidth="lg">
                <DialogContent>
                    {dialogState === 'data' ? movieForm() : dialogState === 'image' ? pictureForm() : dialogState === 'screenshot' ? screenshotForm() : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const movieForm = () => {
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' alt="logo" />
                    <div className={classes.name}>Edit Movie Or Series</div>
                    <img src="/verification.png" style={{ height: '8vh' }} alt="verification" />
                </div>
                <div style={{ margin: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item size={3}>
                            <FormControl error={error.categoryId} onFocus={() => handleErrorMessage('categoryId', null)} fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Category" >
                                    {fillCategory()}
                                </Select>
                                <FormHelperText>{error.categoryId}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item size={3}>
                            <TextField error={error.name} helperText={error.name} onFocus={() => handleErrorMessage('name', null)} label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item size={3}>
                            <TextField error={error.year} helperText={error.year} onFocus={() => handleErrorMessage('year', null)} label='Year' value={year} onChange={(e) => setYear(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item size={3}>
                            <TextField error={error.title} helperText={error.title} onFocus={() => handleErrorMessage('title', null)} label='Title' value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid size={12}>
                            <TextField error={error.description} helperText={error.description} onFocus={() => handleErrorMessage('description', null)} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth></TextField>
                        </Grid>
                        <Grid size={6}>
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

                        <Grid size={6}>
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
                        {handleQualityInputs()}
                    </Grid>
                    <Grid container spacing={2}>
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
        return (
            <div className={classes.box2}>
                <div className={classes.title}>
                    <img className={classes.image} src='/logo.png' alt="logo" />
                    <div className={classes.name}>Edit Image</div>
                    <img src="/verification.png" style={{ height: '8vh' }} alt="verification" />
                </div>
                <div style={{ margin: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img style={{ margin: 0 }} src={image.filename} width={150} alt="preview" />
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: 'column' }}>
                                <Button fullWidth component="label" variant="outlined">
                                    Upload Image
                                    <input onChange={handleImageChange} onFocus={() => handleErrorMessage('image', '')} type="file" accept="image/*" hidden />
                                </Button>
                                <div className={classes.helperTextStyle}>{error.image}</div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={handleClick} fullWidth>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
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

    const showImage = () => {
        if (screenshot.length === 0) {
            return (
                <div style={{ margin: 2 }}>
                    <img src="/film.png" style={{ width: 50, height: 'auto' }} alt="default" />
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
            if (!movieId) throw new Error('Movie ID is missing');

            const formData = new FormData();
            formData.append('movieid', movieId);

            const existScreenshots = screenshot.filter(item => typeof item === 'string');
            const newScreenshots = screenshot.filter(item => item instanceof File);

            if (existScreenshots.length > 0) {
                formData.append('existingScreenshots', existScreenshots.join(','));
            }
            newScreenshots.forEach(file => {
                formData.append('screenshots', file);
            });

            const result = await postData('movie/update_screenshots', formData);

            if (result && result.status) {
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
                    <img className={classes.image} src='/logo.png' alt="logo" />
                    <div className={classes.name}>Edit ScreenShots</div>
                    <img src="/verification.png" style={{ height: '8vh' }} alt="verification" />
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
                                    onFocus={() => handleErrorMessage('screenshot', '')}
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
                                onClick={() => setOpen(false)}
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

    function DisplayAll() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', marginTop: 10 }}>
                <div style={{ padding: 10, margin: 10, maxWidth: '95vw' }}>
                    <MaterialTable
                        title="Movies and Series"
                        columns={[
                            { title: 'ID', field: 'movieid', width: '3%' },
                            { title: 'Category', field: 'categoryname', width: '7%' },
                            { title: 'Name', field: 'name', width: '7%' },
                            { title: 'Title', field: 'title', width: '12%' },
                            { title: 'Language', field: 'language', width: '10%' },
                            { title: 'Year', field: 'year', width: '5%' },
                            { title: 'Genre', field: 'genre', width: '15%' },
                            { title: 'Quality', field: 'quality', width: '5%' },
                            { title: 'Content', field: 'content', width: '7%' },

                            {
                                title: 'Image',
                                width: '4%',
                                render: (rowData) =>
                                    <div style={{ cursor: 'pointer' }} onClick={() => handleOpenDialog(rowData, 'image')}>
                                        <img src={`${serverURL}/images/${rowData.image}`} alt="movie" style={{ width: 40, height: 40, borderRadius: 10 }} />
                                    </div>
                            },
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
                                                        alt={`screenshot-${index}`}
                                                        style={{ width: 40, height: 40, borderRadius: 10 }}
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
                                tooltip: 'Edit Movie',
                                onClick: (event, rowData) => handleOpenDialog(rowData, 'data')
                            },
                            {
                                icon: () => <DeleteIcon />,
                                tooltip: 'Delete Movie',
                                onClick: (event, rowData) => deleteUsingIcon(rowData)
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