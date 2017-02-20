import minimist from 'minimist';

export default function processArgs(args) {
    args = args.slice(2);
    return minimist(args);
}