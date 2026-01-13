interface IRows {
    name: string,
    totalSeats: number,
}
interface ISections {
    name: string;
   rows?: IRows[];
}
interface IEvent {
    name: string,
    date : Date,
    sections: ISections[],
}
export default IEvent