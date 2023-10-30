import { fetchTime, fetchTime2 } from "../lib/data";
import DropdownSearch from "../ui/dropdown-search";

export type Time = {
    datetime: string;
};

export default async function Page() {
    const data = await fetchTime();
    const data2 = await fetchTime2();

    return (
        <main>
            <h1>{data.datetime}</h1>
            <h1>{data2.datetime}</h1>
            <DropdownSearch />

        </main>
    )
}