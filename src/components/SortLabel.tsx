import { SortLabelProps } from "./types";

export default function SortLabel({ filterOptions, setFilterOptions }: SortLabelProps) {
  const sortedField = filterOptions.sort?.field || null;
  const sortedOrder = filterOptions.sort?.order || null;

  let label = "Reset filters";
  let handleClick;
  if (sortedField === "song_translated_date") {
    label = sortedOrder === "ASC" ? "Oldest → Newest Translation" : "Newest → Oldest Translation";
    handleClick = () => {
      setFilterOptions({
        ...filterOptions,
        page: 1,
        sort: {
          field: sortedField,
          order: sortedOrder === "ASC" ? "DESC" : "ASC",
        }
      });
    };
  } else {
    handleClick = () => {
      setFilterOptions({
        lang: null,
        ids: null,
        synths: null,
        producers: null,
        vocalists: null,
        circles: null,
        page: 1,
        sort: {
          field: "song_translated_date",
          order: "DESC"
        }
      });
    };
  }

  return (
    <div onClick={handleClick} className="sort-label">
      {label}
    </div>
  );
}