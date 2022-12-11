import React from "react";
import tamagotchimodels from "../../tamagotchi-models.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

export default function generateCard() {
  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px"
    }
  });

  const tamagotchimodelsobject = tamagotchimodels;
  const descriptions = {
    Vintage:
      "The original franchise of Tamagotchi virtual pets. The first model was released in 1996 and the final model was released in 1999, making it the shortest-lived Tamagotchi franchise.",
    Connection:
      "The Tamagotchi Connection was the first Tamagotchi release to use Tamacom, an Infrared feature that connects two Tamagotchi pets, allowing them to play games, exchange presents, and give birth to offspring.",
    Modern:
      "All the color models, starting from Tamagotchi Plus Color release in 2008, up until present",
    Other: "Other releases that do not correspond to the other categories"
  };

  const [category, setCategory] = React.useState("Vintage");
  const [shells, setShells] = React.useState([]);
  const classes = useStyles();
  return (
    <div>
      <Button className={classes.root}>Hook</Button>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{ mt: 5 }}
      >
        {Object.keys(tamagotchimodels).map((key, index) => {
          return (
            <Grid item sm={2} key={key}>
              <div>
                <Card
                  sx={{ height: "100%" }}
                  onClick={() => {
                    setCategory(key);
                    setShells([]);
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {key}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                      {descriptions[key]}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          );
        })}
      </Grid>

      {/* models */}
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{ mt: 5 }}
      >
        {/* Object.keys(tamagotchimodelsobject.Vintage[0])[0] */}
        {Object.keys(tamagotchimodelsobject[`${category}`]).map(
          (key, index) => {
            return (
              <Grid item sm={2} key={key}>
                <Card
                  sx={{ height: "100%" }}
                  onClick={() => {
                    setShells(
                      tamagotchimodelsobject[`${category}`][`${key}`].shells
                    );
                    //console.log(shells);
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {tamagotchimodelsobject[`${category}`][`${key}`].model}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          }
        )}
      </Grid>

      {/* shains */}
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{ mt: 5 }}
      >
        {shells.map((key, index) => {
          return (
            <Grid item sm={2} key={key.shellName}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  {/* put avatar or image from href here */}
                  <Typography variant="h5" component="div">
                    {key.shellName}
                  </Typography>
                </CardContent>
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
