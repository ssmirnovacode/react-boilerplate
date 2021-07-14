import Log from './log';
import Calc from './calc';

const calc = new Calc();
const log = new Log();

log.log(calc.add(1,2,3));