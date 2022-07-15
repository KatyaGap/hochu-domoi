import * as React from 'react';
import { Box, FormControl, Button, Select, InputLabel, ToggleButtonGroup, ToggleButton, MenuItem, Stack, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredThunk, getParamsThunk } from '../../redux/actions/adverts';
import FilterChip from './FilterChip';

export default function Filters({ adverts }) {
  const dispatch = useDispatch();
  const { params, filtered } = useSelector((state) => state);
  const { types, pets, breeds, colors, sizes, statuses } = params;
  const [filter, setFilter] = React.useState({});
  React.useEffect(() => {
    dispatch(getParamsThunk());
  }, []);

  React.useEffect(() => {
    dispatch(getFilteredThunk(filter));
  }, [filter]);

  const handleSetFilter = React.useCallback((name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  });

  const handleApplyFilter = (e) => {
    e.preventDefault();
    dispatch(getFilteredThunk(filter));
  };

  const [typeButtonValue, setTypeButtonValue] = React.useState("");
  const handleChangeType = (event, newTypeId) => {
    setTypeButtonValue(newTypeId);
    handleSetFilter("type_id", newTypeId);
  };

  return (
    <form onSubmit={handleApplyFilter} style={{ width: "100%" }}>
      <div className="filters-paper">
        <Stack direction="row" className="filterstack">

          <ToggleButtonGroup className="filter-type" onChange={handleChangeType} color="primary" value={typeButtonValue} exclusive>
            <ToggleButton value={2} name="type_id">Потеряшки</ToggleButton>
            <ToggleButton value={1} name="type_id">Найденыши</ToggleButton>
          </ToggleButtonGroup>

          <Stack direction="row" spacing={2} className="filters-chips">
            <FilterChip
              filterName="Вид питомца"
              name="pet_id"
              options={pets}
              handleSetFilter={handleSetFilter}
            />

            {filter.pet_id === 1 && (
            <FilterChip
              filterName="Порода"
              name="breed_id"
              options={breeds}
              handleSetFilter={handleSetFilter}
            />
            )}

            <FilterChip
              filterName="Цвет"
              name="color_id"
              options={colors}
              handleSetFilter={handleSetFilter}
            />

            <FilterChip
              filterName="Размер"
              name="size_id"
              options={sizes}
              handleSetFilter={handleSetFilter}
            />

            {filter.type_id === 1 && (
            <FilterChip
              filterName="Статус"
              name="status_id"
              options={statuses}
              handleSetFilter={handleSetFilter}
            />
            )}
          </Stack>

        </Stack>
        {/* <Button type="submit" variant="contained" className="filter-apply-button">
          Применить
        </Button> */}
      </div>
    </form>
  );
}
