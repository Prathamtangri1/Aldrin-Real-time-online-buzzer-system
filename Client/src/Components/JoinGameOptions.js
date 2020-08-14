import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function JoinGameOptions(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: true,
    setOpen: true,
    gameId: "",
    pname: "",
  });

  let errorGameId = [false, ""];
  let errorPname = [false, ""];

  if(props.error === "pName_repeat") {
    errorPname[0] = true;
    errorPname[1] = 'This Pname has already been taken';
    errorGameId[0] = false;
    errorGameId[1] = '';
  }
  else if(props.error === "gameId doesn't exist") {
    errorGameId[0] = true;
    errorGameId[1] = 'This game doesn\'t exist';
    errorPname[0] = false;
    errorPname[1] = '';
  }
  else {
    errorPname[0] = false;
    errorPname[1] = '';
    errorGameId[0] = false;
    errorGameId[1] = '';   
  }

  function handleClose() {
    setState({setOpen: false});
    props.complete();
  }

  function handleSubmit() {
    props.playerInfo(state.pname, state.gameId);
    handleClose();
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title"  TransitionComponent={Transition}>
        <DialogTitle id="form-dialog-title">New Player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Tooltip title="Choose an existing GameID" arrow>
              <TextField
                id="outlined-gameId"
                label="GameID"
                className={classes.textField}
                value={state.gameId}
                onChange={handleChange('gameId')}
                margin="normal"
                variant="outlined"
                error={errorGameId[0]}
                helperText={errorGameId[1]}
              />
            </Tooltip>
            <Tooltip title="Choose a unique Pname" arrow>
              <TextField
                id="outlined-pname"
                label="Pname"
                className={classes.textField}
                value={state.pname}
                onChange={handleChange('pname')}
                margin="normal"
                variant="outlined"
                error={errorPname[0]}
                helperText={errorPname[1]}
              />
            </Tooltip>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


//   const classes = useStyles();

//   const [open, setOpen] = React.useState(true);

//   function handleClose() {
//     setOpen(false);
//   }

//   return (
//     <div>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
//         <DialogTitle id="form-dialog-title">Online Buzzer Join<span role="img" aria-label="joystick emoji">️🕹️</span></DialogTitle>
//         <DialogActions>
//           <Button variant="contained" size="large" onClick={handleClose} color="primary" className={classes.margin}>
//             New Game
//           </Button>
//           <Button variant="contained" size="large" onClick={handleClose} color="primary" className={classes.margin}>
//             Join Game
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
