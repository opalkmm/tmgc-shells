import React from "react";
import tamagotchimodels from "../../mock-tamagotchi-models.json";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function generateCard() {
  //iterate the object to get the categories

  //   const category = Object.keys(tamagotchimodels);
  //   const eachCate = category.forEach(category);
  const descriptions = [
    {
      Vintage:
        "The original franchise of Tamagotchi virtual pets. The first model was released in 1996 and the final model was released in 1999, making it the shortest-lived Tamagotchi franchise.",
      Connection:
        "The Tamagotchi Connection was the first Tamagotchi release to use Tamacom, an Infrared feature that connects two Tamagotchi pets, allowing them to play games, exchange presents, and give birth to offspring.",
      Modern:
        "All the color models, starting from Tamagotchi Plus Color release in 2008, up until present",
      Other: "Other releases that do not correspond to the other categories"
    }
  ];

  return (
    <div>
      {Object.keys(tamagotchimodels).map((key, index) => {
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {key}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {descriptions.key}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">show more</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

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

// export default CardComponent;
