import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPokemonTypes, getPokemonByType } from "../api/pokemon"
import type { PokemonState, PokemonTypesResponse } from "../../types/pokemon"

const initialState: PokemonState = {
  types: [],
  pokemonList: [],
  loading: false,
  error: null,
  selectedType: null,
  currentPage: 1,
  totalPages: 1,
}

export const fetchPokemonTypes = createAsyncThunk("pokemon/fetchTypes", async () => {
  const response = await getPokemonTypes()
  return response as PokemonTypesResponse
})

export const fetchPokemonByType = createAsyncThunk("pokemon/fetchByType", async (type: string) => {
  const response = await getPokemonByType(type)
  return response.pokemon.map((p: { pokemon: { name: string; url: string } }) => ({
    id: p.pokemon.url.split("/").slice(-2, -1)[0],
    name: p.pokemon.name,
    url: p.pokemon.url,
  }))
})

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearPokemonList: (state) => {
      state.pokemonList = []
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonTypes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.loading = false
        state.types = action.payload.results
      })
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch Pokemon types"
      })
      .addCase(fetchPokemonByType.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.loading = false
        state.pokemonList = action.payload
        state.totalPages = Math.ceil(action.payload.length / 20)
      })
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch Pokemon"
      })
  },
})

export const { setSelectedType, setCurrentPage, clearPokemonList } = pokemonSlice.actions
export default pokemonSlice.reducer

