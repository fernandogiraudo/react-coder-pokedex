import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ pokemon }, setPokemon] = useState({});

  const getPokemonById = async () => {
    if (!id) {
      return;
    }
    const { data, status } = await axios.get(
      `http://localhost:8080/api/pokemon/${id}`
    );
    setPokemon(data);
  };

  useEffect(() => {
    getPokemonById();
  }, [id]);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <>
      <h1>Detalle del Pokemon #{id}</h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Card sx={{ width: "350px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={pokemon?.frontImg ?? ""}
              alt={pokemon?.name ?? ""}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                #{pokemon?.pokemonId ?? ""} {pokemon?.name ?? ""}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {pokemon?.types.map((element) => (
                  <Typography>{element.type.name}</Typography>
                ))}
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href={"/"}>
              <Button size="small" color="primary">
                Volver
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default PokemonDetail;
