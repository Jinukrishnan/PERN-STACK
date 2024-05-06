// const Pool=require('pg').Pool
import Pool from 'pg';
const PL=Pool.Pool

const pool=new PL({
    user:"postgres",
    password:'root',
    host:"localhost",
    port:5432,
    database:"perntodo"

});

export default pool
