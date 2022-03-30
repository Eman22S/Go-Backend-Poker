import React, { useState,useEffect  } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import Buttonx from "./fragments/Buttonx";
import TextFieldx from "./fragments/TextFieldx";
import Copyright from "./fragments/Copyright";
import Typographyx from "./fragments/Typographyx";
import { InputLabel } from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PaperTable from "./fragments/PaperTable";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import Checkbox from "@material-ui/core/Checkbox";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useSnackBarContext } from "./../contexts/snackbar";
import useGrpcClient from "../contexts/grpc_client";
import { font_family } from "./utils/constants";
import { DEV_IMAGE_URL } from "../utils/image_utils";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";
import "prismjs/themes/prism.css";
import { ColorPicker } from 'material-ui-color';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  removeIcon: {
    position: "absolute",
    opacity: "1",
    marginTop: "20px"
  },
  logo: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "40%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(0, 2),
  },
  card_header: {
    paddingBottom: 0,
  },
  card_content: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  card: {
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  background: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat,
   // backgroundSize: 'cover'

  },
  background_dark: {
    backgroundColor: theme.palette.background.dark,
  },
}));


const defaultStyle = {
  backgroundDark :"#00102c",
  backgroundPaper :"#0a2042",
  backgroundDefault :"#1c3254",
  backgroundLight : "#233655",
  primaryColor :"#2e9ad6",
  selectedColor :"#2196f3",
  fontFamily :"Roboto"
}

const styles = {
  card_content: {
    marginTop: 16,
    marginBottom: 16,
  },
};

const background_repeat_types = ['round','space','repeat','repeat-y','repeat-x','no-repeat']



export default function UiSettings(props) {
  const classes = useStyles();

  const showSnackBar = useSnackBarContext();
  const grpc_client = useGrpcClient();

  const [tempImage, setTempImage] = useState(null);
  const [tempBackground, setTempBackground] = useState(null);

  const [logo, setLogo] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [backgroundDark, setBackgroundDark] = useState(defaultStyle['backgroundDark']);
  const [backgroundPaper, setBackgroundPaper] = useState(defaultStyle['backgroundPaper']);
  const [backgroundDefault, setBackgroundDefault] = useState(defaultStyle['backgroundDefault']);
  const [backgroundLight, setBackgroundLight] = useState(defaultStyle['backgroundLight']);
  const [primaryColor, setPrimaryColor] = useState(defaultStyle['primaryColor']);
  const [selectedColor, setSelectedColor] = useState(defaultStyle['selectedColor']);
  const [fontFamily, setFontFamily] = useState(defaultStyle['fontFamily']);
  const [themes, setThemes] = useState([]);
  const [selectedThemeName, setSelectedThemeName] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState("");
  const [themeName, setThemeName] = useState("");
  const [backgroundRepeat, setBackgroundRepeat] = useState(background_repeat_types[0]);
  const [showRemoveIconForLogo, setShowRemoveIconForLogo] = useState(false);
  const [showRemoveIconForBg, setShowRemoveIconForBg] = useState(false);

  const [isActionEdit,setIsActionEdit] = useState(false);


  const {
    register,
    handleSubmit,
    setValue
  } = useForm({
    // react-hook-form needs values set here to work with default values properly
    defaultValues: {
      backgroundDark,
      backgroundDefault,
      backgroundLight,
      backgroundPaper,
      backgroundRepeat,
      fontFamily,
      primaryColor,
      selectedColor,
    },
    mode: 'onSubmit'
  });


  // custom register material-ui select so that they can work with react-hook-from properly
  useEffect(() => {
    register({ name: "fontFamily" });
    register({ name: "backgroundDefault" });
    register({ name: "backgroundPaper" });
    register({ name: "backgroundLight" });
    register({ name: "backgroundDark" });
    register({ name: "primaryColor" });
    register({ name: "selectedColor" });
    register({ name: "backgroundRepeat" });
  }, [register]);


  const [open, setOpen] = React.useState(false);

  /*const handleClickOpen = () => {
    setOpen(true);
  };*/

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTheme = () => {
    setOpen(false);
    let data = {
      backgroundDark,
      backgroundPaper,
      backgroundDefault,
      backgroundLight,
      primaryColor,
      selectedColor,
    }

    console.log("theme");
    console.log(data);



    grpc_client.setTheme(
      themeName,
      data,
      (response)=>{
        showSnackBar('Theme saved !', 'success')
        console.log(response)

        getThemes()
      },
      on_error
    );
  };


  const handleEditTheme = () => {
    setOpen(false);
    let data = {
      backgroundDark,
      backgroundPaper,
      backgroundDefault,
      backgroundLight,
      primaryColor,
      selectedColor,
    }

    console.log("edit theme");
    console.log(data);



    grpc_client.editTheme(
      selectedThemeId,
      themeName,
      data,
      (response)=>{
        showSnackBar('Theme edited !', 'success')
        console.log(response)

        getThemes()
      },
      on_error
    );
  };



  const changeSelectUsing = (name) => (e) => {
    console.log(name+" "+e.target.value)
    setValue(name, e.target.value);
    setFontFamily(e.target.value)
  };
  const changeBackgroundRepeat = (name) => (e) => {
    console.log(name+" "+e.target.value)
    setValue(name, e.target.value);
    setBackgroundRepeat(e.target.value)
  };

  const handleChangeTheme = (data) => (event) => {
    setSelectedThemeName(data.name);
    setSelectedThemeId(data.id);

    console.log(data.name);
    if(data.data.backgroundDark){
      setValue("backgroundDark", data.data.backgroundDark);
      setBackgroundDark(data.data.backgroundDark);
    }
    if(data.data.backgroundPaper){
      setValue("backgroundPaper", data.data.backgroundPaper );
      setBackgroundPaper(data.data.backgroundPaper)
    }
    if(data.data.backgroundDefault){
      setValue("backgroundDefault", data.data.backgroundDefault );
      setBackgroundDefault(data.data.backgroundDefault)
    }
    if(data.data.backgroundLight){
      setValue("backgroundLight", data.data.backgroundLight);
      setBackgroundLight(data.data.backgroundLight)
    }


    if(data.data.primaryColor){
      setValue("primaryColor", data.data.primaryColor);
      setPrimaryColor(data.data.primaryColor);
    }

    if(data.data.selectedColor){
      setValue("selectedColor", data.data.selectedColor);
      setSelectedColor(data.data.selectedColor)
    }



  }

  const onSubmit = (data) => {
        debugger;
      const settingData = data;
        if(backgroundImg){
          settingData.backgroundImg = backgroundImg;
        }
        settingData.logo = logo;
        if(!Object.values(settingData).every(( item => item === undefined))){
          console.log("onSubmit");
          console.log(data);
          grpc_client.setUiSettings(
              settingData,
            (response)=>{
              showSnackBar('Ui Setting Updated!', 'success')
              window.location.reload();
              console.log(response)
            },
            on_error
          );
        }
  };




  const handleBgChange = (value,setFunc,key) => {
    //setFunc(value);
    setFunc("#"+value.hex);
    setValue(key, "#"+value.hex);
  };


  const resetToDefault = () => {
    setBackgroundDark(defaultStyle['backgroundDark']);
    setBackgroundPaper(defaultStyle['backgroundPaper']);
    setBackgroundDefault(defaultStyle['backgroundDefault']);
    setBackgroundLight(defaultStyle['backgroundLight']);
    setPrimaryColor(defaultStyle['primaryColor']);
    setSelectedColor(defaultStyle['selectedColor']);
    setFontFamily(defaultStyle['fontFamily']);

    setValue("backgroundDark", defaultStyle['backgroundDark']);
    setValue("backgroundPaper", defaultStyle['backgroundPaper']);
    setValue("backgroundDefault", defaultStyle['backgroundDefault']);
    setValue("backgroundLight", defaultStyle['backgroundLight']);
    setValue("primaryColor", defaultStyle['primaryColor']);
    setValue("selectedColor", defaultStyle['selectedColor']);
    setValue("fontFamily", defaultStyle['fontFamily']);
  }

  const saveTheme = () => {
    setThemeName("")
    setIsActionEdit(false)
    setOpen(true);
  }
  const editTheme = () => {
    setThemeName(selectedThemeName)
    setIsActionEdit(true)
    setOpen(true);
  }
  const deleteBackgroundImg = () => {

    grpc_client.deleteUiSettings(
      "backgroundImg",
      (response)=>{
        showSnackBar('Background Img Deleted !', 'success');
        //console.log(response)
        window.location.reload();
      },
      on_error
    );

    setSelectedThemeName(null)
    setSelectedThemeId("")

    getThemes();

  }
  const handleThemeDelete = e => {
    console.log("handleThemeDelete "+selectedThemeName);
    grpc_client.deleteTheme(
      selectedThemeName,
      (response)=>{
        showSnackBar('Theme Deleted !', 'success')
        console.log(response)

        getThemes()
      },
      on_error
    );

    setSelectedThemeName(null)
    setSelectedThemeId("")

    getThemes();

  }


  const handleCustomCssUpdate = e => {
    console.log("updateCustomCss"+selectedThemeName);
    grpc_client.updateCustomCss(
      code,
      (response)=>{
        showSnackBar('Saved', 'success')

      },
      on_error
    );

    setSelectedThemeName(null)
    setSelectedThemeId("")

    getThemes();

  }

  const handleImageChange = e => {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        setLogo(btoa(reader.result));
        setShowRemoveIconForLogo(true);
    };
    reader.onerror = function() {
        console.log('there are some problems');
      setShowRemoveIconForLogo(true);
    };
    reader.onabort = function(){
      console.log('there are some problems');
      setShowRemoveIconForLogo(true);
    }
    reader.readAsBinaryString(file);
    let reader2 = new FileReader();
    reader2.onloadend = () => {
      setTempImage(reader2.result);
      setShowRemoveIconForLogo(true);
    };
    reader2.readAsDataURL(file);
    e.target.value= "";

  }
  const handleBackgroundImgChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        setBackgroundImg(btoa(reader.result));
        setShowRemoveIconForBg(true);
    };
    reader.onerror = function() {
        console.log('there are some problems');
      setShowRemoveIconForBg(false);
    };
    reader.onabort = function(){
      console.log('there are some problems');
      setShowRemoveIconForBg(false);
    }

    reader.readAsBinaryString(file);

    let reader2 = new FileReader();
    reader2.onloadend = () => {
      setTempBackground(reader2.result);
      setShowRemoveIconForBg(true);
    };
    reader2.readAsDataURL(file);
    e.target.value= "";
  }

  const onRemoveIconForLogo = (e) =>{
    e.preventDefault();
    setTempImage(null);
    setLogo("");
    setShowRemoveIconForLogo(false);
  }

  const onRemoveIconForBg = (e) =>{
    e.preventDefault();
    setTempBackground("");
    setShowRemoveIconForBg(false);
  }

  const getAllUiSettings = () => {
    grpc_client.getAllUiSettings((resp) => {
      let ui_settings = Object.assign({}, ...JSON.parse(resp));
      console.log("ui_settings");
      console.log(ui_settings);
      if(ui_settings.backgroundDark){
        setBackgroundDark(ui_settings.backgroundDark)
      }
      if(ui_settings.backgroundLight){
        setBackgroundLight(ui_settings.backgroundLight)
      }
      if(ui_settings.backgroundDefault){
        setBackgroundDefault(ui_settings.backgroundDefault)
      }
      if(ui_settings.backgroundPaper){
        setBackgroundPaper(ui_settings.backgroundPaper)
      }

      if(ui_settings.primaryColor){
        setPrimaryColor(ui_settings.primaryColor)
      }

      if(ui_settings.selectedColor){
        setSelectedColor(ui_settings.selectedColor)
      }

      if(ui_settings.backgroundRepeat){
        setBackgroundRepeat(ui_settings.backgroundRepeat)
      }


      if(ui_settings.fontFamily){
        setFontFamily(ui_settings.fontFamily);
      }
      console.log("logo "+ui_settings.logo);
      if(ui_settings.logo){
        let temp_img_src = DEV_IMAGE_URL + ui_settings.logo.replace("./","/");
        setTempImage(temp_img_src);
      }
      if(ui_settings.backgroundImg){
        let temp_img_src = DEV_IMAGE_URL + ui_settings.backgroundImg.replace("./","/");
        setTempBackground(temp_img_src);
      }


    }, on_error);
  }

  const getThemes = () => {
    grpc_client.getThemes((resp) => {
      setThemes(JSON.parse(resp));
      setSelectedThemeId("")
      console.log(JSON.parse(resp));

    }, on_error);
  }

  const getCustomCss = () => {
    grpc_client.getCustomCss((resp) => {
      setCode(resp.getData());

    }, on_error);
  }

  const on_error = (custom_msg) => {
    console.log(custom_msg);
    if (custom_msg) {
        showSnackBar(custom_msg);
    }
  }

  const [code, setCode] = React.useState("");
  //`p { color: "red"; }`



  useEffect(() => {
    getAllUiSettings();
    getThemes();
    getCustomCss();
  //eslint-disable-next-line
  }, [])

  return (
    <div className={classes.background}>
      <Container
        component="main"
        maxWidth="lg"
        align="center"
        className={classes.main}
      >
        <div className={classes.paper}>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1} xs={12}>
                <Grid xs={12}>
                  <Typographyx variant="h6" color="textSecondary">
                    Ui Settings
                  </Typographyx>
                </Grid>
              <Grid  xs={6}>

                <Grid  xs={3}></Grid>

                <Grid item xs={6}>
                      <Grid container spacing={1}>
                      <Grid itm xs={3}></Grid>

                      <Grid item xs={12} style={{display: 'grid'}}>
                          <InputLabel align="center" style={{marginBottom: '10px'}} >Logo </InputLabel>
                          {tempImage ? <img src={tempImage} style={{width:"200px", height:"200px"}} alt="Logo" /> :
                        <img src="http://img1.wikia.nocookie.net/__cb20130901213905/battlebears/images/9/98/Team-icon-placeholder.png" alt="placeholder"  style={{width:"200px", height:"200px", marginBottom:"10px",}}/>}
                        <label htmlFor="upload-photo-logo" >
                          <input id="upload-photo-logo" type="file" onChange={handleImageChange} style={{marginBottom:"20px", display: 'none'}}/>
                          <Button color="primary" variant={"contained"} component={"span"}>
                            Choose File
                          </Button>
                        </label>

                        {showRemoveIconForLogo || tempImage ? <HighlightOffIcon onClick={onRemoveIconForLogo} color={"primary"} fontSize={"med"}  className={classes.removeIcon}/> : null}

                      </Grid>

                      <Grid item xs={12} mt={5} style={{display: 'grid'}}>
                      <InputLabel align="center" style={{margin: "10px 0"}}>Background Image </InputLabel>
                          {tempBackground ? <img src={tempBackground} style={{width:"200px", height:"200px"}} alt="Background" /> :
                          <img src="http://img1.wikia.nocookie.net/__cb20130901213905/battlebears/images/9/98/Team-icon-placeholder.png"  style={{marginBottom: '10px'}} alt="placeholder" />}
                          <label htmlFor="upload-photo-bg" >
                            <input id="upload-photo-bg" type="file" onChange={handleBackgroundImgChange} style={{marginBottom:"20px", display: 'none'}}/>
                            <Button color="primary" variant={"contained"} component={"span"}>
                              Choose File
                            </Button>
                          </label>
                        {showRemoveIconForBg || tempBackground ? <HighlightOffIcon onClick={onRemoveIconForBg} color={"primary"} fontSize={"med"}  className={classes.removeIcon}/> : null}
                      </Grid>

                      <Grid item xs={12} container>
                        <FormControlLabel
                            control={
                              <Checkbox
                              disabled={!tempBackground}
                              onChange={()=>{
                                deleteBackgroundImg()
                              }}
                              color="default"

                              />
                            }
                            label={<Typographyx variant="body2" color="textSecondary">Delete Background Image</Typographyx>} />

                        </Grid>


                        <Grid item xs={12} >
                          <TextFieldx
                            select={true}
                            name="backgroundRepeat"
                            onChange={changeBackgroundRepeat("backgroundRepeat")}

                            value={backgroundRepeat}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            placeholder="background_repeat"
                            required
                            fullWidth
                            id="backgroundRepeat"
                            label="backgroundRepeat"
                            autoComplete="backgroundRepeat"
                            autoFocus
                            ref={register}
                            my={0.5}
                          >
                            { background_repeat_types.map((type, index) => (
                              <MenuItem value={type} key={index}>
                                {type}
                              </MenuItem>
                            ))}
                          </TextFieldx>
                        </Grid>
                          <Grid item xs={12} >
                          <TextFieldx
                            select={true}
                            name="fontFamily"
                            onChange={changeSelectUsing("fontFamily")}
                            /*defaultValue={[
                              fontFamily
                                ? fontFamily
                                : font_family[0].value,
                            ]} */
                            value={fontFamily}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            placeholder="font_family"
                            required
                            fullWidth
                            id="fontFamily"
                            label="Font Family"
                            autoComplete="FontFamily"
                            autoFocus
                            ref={register}
                            my={0.5}
                          >
                            {font_family.map((type, index) => (
                              <MenuItem value={type.value} key={index}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </TextFieldx>
                          </Grid>

                          <Grid item xs={12} container>
                              <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center">
                                  <InputLabel
                                  >Background Default </InputLabel>
                              </Grid>
                              <Grid item >
                                  <ColorPicker
                                    name="backgroundDefault" variant="outlined"
                                    onChange={  (value) =>{handleBgChange(value,setBackgroundDefault,"backgroundDefault")}}
                                    value={backgroundDefault}

                                    />
                              </Grid>
                          </Grid>
                          <Grid item xs={12} container>
                              <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center">
                                  <InputLabel
                                  >Background Dark </InputLabel>
                              </Grid>
                              <Grid item >
                                  <ColorPicker
                                    name="backgroundDark" variant="outlined"
                                    onChange={  (value) =>{handleBgChange(value,setBackgroundDark,"backgroundDark")}}
                                    value={backgroundDark}

                                    />
                              </Grid>
                          </Grid>
                          <Grid item xs={12} container>
                              <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center">
                                  <InputLabel
                                  >Background Light </InputLabel>
                              </Grid>
                              <Grid item >
                                  <ColorPicker
                                    name="backgroundLight" variant="outlined"
                                    onChange={  (value) =>{handleBgChange(value,setBackgroundLight,"backgroundLight")}}
                                    value={backgroundLight}

                                    />
                              </Grid>
                          </Grid>
                          <Grid item xs={12} container>
                              <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center">
                                  <InputLabel
                                  >Background Paper </InputLabel>
                              </Grid>
                              <Grid item >
                                  <ColorPicker
                                    name="backgroundPaper" variant="outlined"
                                    onChange={  (value) =>{handleBgChange(value,setBackgroundPaper,"backgroundPaper")}}
                                    value={backgroundPaper}

                                    />
                              </Grid>
                          </Grid>
                          <Grid item xs={12} container>
                              <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center">
                                  <InputLabel
                                  >
                                    Primary Color </InputLabel>
                              </Grid>
                              <Grid item >
                                  <ColorPicker
                                    name="primaryColor" variant="outlined"
                                    onChange={  (value) =>{handleBgChange(value,setPrimaryColor,"primaryColor")}}
                                    value={primaryColor}

                                    />
                              </Grid>
                          </Grid>
                          <Grid item xs={12} container>
                              <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center">
                                  <InputLabel
                                  >
                                    Selected Color </InputLabel>
                              </Grid>
                              <Grid item >
                                  <ColorPicker
                                    name="primaryColor" variant="outlined"
                                    onChange={  (value) =>{handleBgChange(value,setSelectedColor,"selectedColor")}}
                                    value={selectedColor}

                                    />
                              </Grid>
                          </Grid>

                          <Grid  xs={12} align="center">

                              <Grid item xs={12} spacing={1}>
                                <Buttonx
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  mt={1}
                                  >
                                  Apply
                                </Buttonx>
                              </Grid>
                          </Grid>
                          <Grid  xs={12} align="center">

                          <Grid item xs={12} spacing={1}>
                          <Buttonx
                                variant="contained"
                                color="primary"
                                fullWidth
                                mt={1}
                                onClick={resetToDefault}
                                >
                                Reset to Default
                              </Buttonx>
                          </Grid>
                      </Grid>
                          <Grid  xs={12} container spacing={1}>
                              <Grid item xs={6}  m={10}>
                                <Buttonx
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  mt={1}
                                  onClick={saveTheme}
                                  >
                                  Save Theme
                                </Buttonx>
                              </Grid>
                              <Grid item xs={6} spacing={1}>
                                <Buttonx
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  mt={1}
                                  onClick={editTheme}
                                  disabled={selectedThemeId===""}
                                  >
                                  Update Theme
                                </Buttonx>
                              </Grid>
                          </Grid>
                          <Grid  xs={4} ></Grid>
                        </Grid>

                </Grid>
              </Grid>



              <Grid   xs={6}>
                <Grid item xs={12}>
                      <Grid xs={12} style={{height:"200px"}} ></Grid>

                      <Grid item xs={12}>
                          <Typographyx variant="button" color="textSecondary">
                            Themes
                          </Typographyx>
                      </Grid>
                      <PaperTable className={classes.root}>
                        <TableContainer className={classes.container}>
                          <Table >
                            <TableHead>
                              <StyledTableRow>
                              <StyledTableCell ></StyledTableCell>
                                <StyledTableCell align="left">
                                  Theme Name
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody style={styles.card_content}>
                              {themes && themes.map((val)=> (
                                  <StyledTableRow
                                    key={val.name}
                                    hover={true}
                                    onClick={handleChangeTheme(val)}
                                    selected={selectedThemeName === val.name}
                                  >
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                        padding="checkbox"
                                      >
                                        <Checkbox
                                          checked={selectedThemeName === val.name}
                                          onChange={handleChangeTheme(val)}
                                          name={''}
                                          color="default"
                                        />
                                      </StyledTableCell>
                                    <StyledTableCell align="left" padding="checkbox">
                                      {val.name}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                            </TableBody>
                          </Table>
                          {
                            themes && themes.length === 0 ? (
                              <Typographyx variant="subtitle2" pb={5} pt={3}>
                                  No theme found.
                              </Typographyx>
                            ) : ("")
                          }
                        </TableContainer>
                      </PaperTable>
                      <Grid item xs={12} align="center">
                        <Grid item xs={4}>
                          <Buttonx
                            variant="contained"
                            color="primary"
                            fullWidth
                            mt={1}
                            disabled={!selectedThemeName}
                            onClick={handleThemeDelete}
                            >
                            Delete
                          </Buttonx>
                        </Grid>
                      </Grid>
                      <Grid xs={12}  style={{height:"50px"}}  ></Grid>
                      <Grid item xs={12}>
                            <Typographyx variant="button" color="textSecondary">
                              Custom css
                            </Typographyx>
                        </Grid>
                      <Grid item xs={12}  className={classes.background_dark} >


                      <Editor
                          value={code}
                          onValueChange={(code) => setCode(code)}
                          highlight={(code) => highlight(code, languages.css)}
                          padding={10}
                          style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                            resize:"vertical",
                            minHeight:"300px"
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} align="center">
                        <Grid item xs={4}>
                          <Buttonx
                            variant="contained"
                            color="primary"
                            fullWidth
                            mt={1}
                            onClick={handleCustomCssUpdate}
                            >

                            Save
                          </Buttonx>
                        </Grid>
                      </Grid>

                </Grid>

              </Grid>


             </Grid>



           </form>

           <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Theme</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
              <TextFieldx
                autoFocus
                margin="dense"
                id="name"
                label="Theme Name"
                type="text"
                onChange={(e=>{setThemeName(e.target.value)})}
                onKeyPress={e =>  e.key === "Enter" && themeName ? handleSaveTheme() : null }
                value={themeName}
                fullWidth
                required
              />
            </DialogContent>
            <DialogActions>
              <Buttonx onClick={handleClose} color="primary">
                Cancel
              </Buttonx>
              { !isActionEdit?
              <Buttonx onClick={handleSaveTheme} color="primary" disabled={!(themeName)}>
                Save
              </Buttonx>
              :
              <Buttonx onClick={handleEditTheme} color="primary" disabled={!(themeName)}>
                Update
              </Buttonx>
              }
            </DialogActions>
          </Dialog>


        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
