import React from "react";
import tamagotchimodels from "../../mock-tamagotchi-models.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import { styled } from "@mui/styles";

//hover transition to write in the styling function
// card : {
//     transition: theme.transitions.create(["background", "background-color"], {
//       duration: theme.transitions.duration.complex,
//     }),
//     "&:hover": {
//       backgroundColor: "#333",
//     },
// }

export default function generateCard() {
  const descriptions = {
    Vintage:
      "The original franchise of Tamagotchi virtual pets. The first model was released in 1996 and the final model was released in 1999, making it the shortest-lived Tamagotchi franchise.",
    Connection:
      "The Tamagotchi Connection was the first Tamagotchi release to use Tamacom, an Infrared feature that connects two Tamagotchi pets, allowing them to play games, exchange presents, and give birth to offspring.",
    Modern:
      "All the color models, starting from Tamagotchi Plus Color release in 2008, up until present",
    Other: "Other releases that do not correspond to the other categories"
  };
  //   const useStyles = styled({
  //     root: {
  //       maxWidth: 310,
  //       transition: "transform 0.15s ease-in-out"
  //     },
  //     cardHovered: {
  //       transform: "scale3d(1.05, 1.05, 1)"
  //     }
  //   });

  //   function ImgMediaCard(props) {
  //     const classes = useStyles();
  //     const [state, setState] = setState({
  //       raised: false,
  //       shadow: 1
  //     });

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{ mt: 5 }}
      >
        {Object.keys(tamagotchimodels).map((key, index) => {
          {
            /* console.log(descriptions.key); */
          }
          return (
            <Grid
              item
              sm={2}
              key={key}
              // className={classes.root}
              // classes={{ root: state.raised ? classes.cardHovered : "" }}
              // onMouseOver={() => setState({ raised: true, shadow: 3 })}
              // onMouseOut={() => setState({ raised: false, shadow: 1 })}
              // raised={state.raised}
              // zdepth={state.shadow}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {key}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    {descriptions[key]}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">show more</Button>
                </CardActions> */}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
// }

//console.log(tamagotchimodels);

// const CardComponent = ({
//   className,
//   cardTitle,
//   value,
//   lastUpdate,
//   cardSubtitle
// }) => (
//   <Grid
//     item
//     xs={12}
//     md={3}
//     component={Card}
//     className={cx(styles.card, className)}
//   >
//     <CardContent>
//       <Typography color="textSecondary" gutterBottom>
//         {cardTitle}
//       </Typography>
//       <Typography variant="h5" component="h2">
//         <CountUp start={0} end={value} duration={2.75} separator="," />
//       </Typography>
//       <Typography color="textSecondary">
//         {new Date(lastUpdate).toDateString()}
//       </Typography>
//       <Typography variant="body2" component="p">
//         {cardSubtitle}
//       </Typography>
//     </CardContent>
//   </Grid>
// );

// export default CardComponent
