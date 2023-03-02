export function MovieSearch() {
  return (
    <div className="pt-4 flex flex-col">
      <Movies />
    </div>
  );
}

export function Movies() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <MovieTile />
    </div>
  );
}

export function MovieTile() {
  return (
    <a
      href="https://www.themoviedb.org/movie/562"
      target="_blank"
      rel="noreferrer"
      className="shadow-xl group relative w-[300px] overflow-hidden"
    >
      <img
        className="group-hover:opacity-10"
        src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg"
        alt="Movie poster"
      />
      <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 p-4 ">
        <h3>Die Hard [1988] [7.8]</h3>
        <p>
          NYPD cop John McClanes plan to reconcile with his estranged wife is thrown for a serious loop when, minutes after he arrives at
          her office, the entire building is overtaken by a group of terrorists. With little help from the LAPD, wisecracking McClane sets
          out to single-handedly rescue the hostages and bring the bad guys down.
        </p>
      </div>
    </a>
  );
}
