import { parseInput } from '../utils/input';

const testString = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;
const input = `#############################################################################################################################################
###...#...#.........#...#...###...#...###...#.....#...#####.............#.....###...#.......#...#...#...###.......#...#...#...###...###.....#
###.#.#.#.#.#######.#.#.#.#.###.#.#.#.###.#.#.###.#.#.#####.###########.#.###.###.#.#.#####.#.#.#.#.#.#.###.#####.#.#.#.#.#.#.###.#.###.###.#
#...#...#.#.....#...#.#.#.#...#.#.#.#.#...#.#...#.#.#...#...#...........#...#...#.#.#...#...#.#.#.#.#.#.#...#...#...#...#.#.#...#.#.#...#...#
#.#######.#####.#.###.#.#.###.#.#.#.#.#.###.###.#.#.###.#.###.#############.###.#.#.###.#.###.#.#.#.#.#.#.###.#.#########.#.###.#.#.#.###.###
#.......#.......#.....#.#...#.#.#.#.#.#.#...#...#.#.#...#...#.....#...#...#...#.#.#.#...#...#.#.#.#.#.#.#.#...#...#.......#.#...#.#.#...#.###
#######.###############.###.#.#.#.#.#.#.#.###.###.#.#.#####.#####.#.#.#.#.###.#.#.#.#.#####.#.#.#.#.#.#.#.#.#####.#.#######.#.###.#.###.#.###
###...#.............#...#...#...#.#.#.#.#...#...#...#.#.....#...#.#.#.#.#.#...#.#.#.#.....#...#...#.#.#.#.#.....#...#.......#...#.#.#...#...#
###.#.#############.#.###.#######.#.#.#.###.###.#####.#.#####.#.#.#.#.#.#.#.###.#.#.#####.#########.#.#.#.#####.#####.#########.#.#.#.#####.#
#...#...###...#.....#...#.......#...#.#.#...###...#...#.#.....#...#.#...#.#.#...#.#...###...#.......#.#.#.#.....#...#.......#...#.#.#...#...#
#.#####.###.#.#.#######.#######.#####.#.#.#######.#.###.#.#########.#####.#.#.###.###.#####.#.#######.#.#.#.#####.#.#######.#.###.#.###.#.###
#.....#.#...#.#.......#.###...#.....#...#.#...#...#...#.#...#.....#.....#.#.#...#.#...#...#.#.....#...#...#.#...#.#...###...#.#...#.#...#...#
#####.#.#.###.#######.#.###.#.#####.#####.#.#.#.#####.#.###.#.###.#####.#.#.###.#.#.###.#.#.#####.#.#######.#.#.#.###.###.###.#.###.#.#####.#
###...#.#...#.........#.#...#.....#.#.....#.#...#.....#...#...#...###...#.#.#...#.#...#.#.#.#.....#.#.....#.#.#.#...#...#...#.#.#...#.#.....#
###.###.###.###########.#.#######.#.#.#####.#####.#######.#####.#####.###.#.#.###.###.#.#.#.#.#####.#.###.#.#.#.###.###.###.#.#.#.###.#.#####
#...#...###...........#.#.#...#...#.#...#...#.....#...#...#.....#...#...#.#.#.#...#...#.#.#.#.#...#...#...#.#.#...#.#...#...#...#...#.#.#...#
#.###.###############.#.#.#.#.#.###.###.#.###.#####.#.#.###.#####.#.###.#.#.#.#.###.###.#.#.#.#.#.#####.###.#.###.#.#.###.#########.#.#.#.#.#
#.#...#######...#.....#.#...#.#.###...#.#...#.......#.#...#.#...#.#.....#...#.#.#...#...#...#.#.#...#...#...#.#...#.#.#...#.........#.#...#.#
#.#.#########.#.#.#####.#####.#.#####.#.###.#########.###.#.#.#.#.###########.#.#.###.#######.#.###.#.###.###.#.###.#.#.###.#########.#####.#
#.#.#...###...#.#.....#.#...#.#...#...#.....#.....#...#...#...#.#...........#...#.....#.......#.#...#...#.#...#.#...#.#...#.....#.....#.....#
#.#.#.#.###.###.#####.#.#.#.#.###.#.#########.###.#.###.#######.###########.###########.#######.#.#####.#.#.###.#.###.###.#####.#.#####.#####
#.#.#.#...#...#...###.#.#.#.#.#...#.........#...#...###...#.....#...###...#...#.........#.......#...#...#.#.#...#...#.....#.....#.#...#.#...#
#.#.#.###.###.###.###.#.#.#.#.#.###########.###.#########.#.#####.#.###.#.###.#.#########.#########.#.###.#.#.#####.#######.#####.#.#.#.#.#.#
#.#.#...#.....#...#...#.#.#.#.#.#.....#.....#...###.....#.#.###...#.#...#.###.#.......###.....#.....#.#...#.#.....#.....#...#...#...#.#.#.#.#
#.#.###.#######.###.###.#.#.#.#.#.###.#.#####.#####.###.#.#.###.###.#.###.###.#######.#######.#.#####.#.###.#####.#####.#.###.#.#####.#.#.#.#
#.#.#...#.....#.###...#.#.#...#.#...#.#...#...#...#...#.#.#...#...#.#...#.#...#.......#.....#.#.....#.#.#...#.....#...#.#.#...#...#...#...#.#
#.#.#.###.###.#.#####.#.#.#####.###.#.###.#.###.#.###.#.#.###.###.#.###.#.#.###.#######.###.#.#####.#.#.#.###.#####.#.#.#.#.#####.#.#######.#
#.#.#.....###.#.#...#.#.#.....#.....#.#...#.###.#.....#.#...#.#...#.#...#.#...#.#...#...#...#.#.....#.#.#.#...#...#.#...#...#.....#.#.......#
#.#.#########.#.#.#.#.#.#####.#######.#.###.###.#######.###.#.#.###.#.###.###.#.#.#.#.###.###.#.#####.#.#.#.###.#.#.#########.#####.#.#######
#.#.###...#...#...#...#...###.#.......#...#.#...#...#...###.#.#...#.#...#...#.#...#.#...#.#...#...#...#...#...#.#.#.....#.....#...#.#.......#
#.#.###.#.#.#############.###.#.#########.#.#.###.#.#.#####.#.###.#.###.###.#.#####.###.#.#.#####.#.#########.#.#.#####.#.#####.#.#.#######.#
#.#.....#...#...........#.....#.....#...#.#...#...#...#...#.#...#.#...#.#...#.#.....#...#...#.....#.#.........#.#.#...#.#.......#.#...#.....#
#.###########.#########.###########.#.#.#.#####.#######.#.#.###.#.###.#.#.###.#.#####.#######.#####.#.#########.#.#.#.#.#########.###.#.#####
#.#...........#...#.....#.......#...#.#.#...#...#...###.#.#...#.#...#.#.#.###.#.#...#.......#.#...#.#.#...#...#.#.#.#.#.#.........#...#.....#
#.#.###########.#.#.#####.#####.#.###.#.###.#.###.#.###.#.###.#.###.#.#.#.###.#.#.#.#######.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#########.#######.#
#.#.#...........#.#...#...#.....#.#...#.#...#.#...#...#.#.#...#...#.#.#.#...#.#.#.#.#...#...#.#.#.#.#.#.#.#.#.#.#.#.#.#.#...........#...#...#
#.#.#.###########.###.#.###.#####.#.###.#.###.#.#####.#.#.#.#####.#.#.#.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#.#.#.#.#.#.#############.#.#.###
#...#.#.........#.....#.#...#...#...#...#.###...#...#...#.#...#...#.#.#...#...#.#.#...#.#.###.#.#.#.#...#...#.#.#...#...#.............#...###
#####.#.#######.#######.#.###.#.#####.###.#######.#.#####.###.#.###.#.###.#####.#.#####.#.###.#.#.#.#########.#.#########.###################
#.....#.#.......#...#...#...#.#.....#...#.........#.###...#...#...#.#.#...#.....#.###...#.#...#.#...#.........#.#.....#...#...........#.....#
#.#####.#.#######.#.#.#####.#.#####.###.###########.###.###.#####.#.#.#.###.#####.###.###.#.###.#####.#########.#.###.#.###.#########.#.###.#
#.......#.........#...#.....#.#.....###.............#...#...#...#.#.#.#.###.....#...#.#...#...#...###...........#...#...#...#...#...#...#...#
#######################.#####.#.#####################.###.###.#.#.#.#.#.#######.###.#.#.#####.###.#################.#####.###.#.#.#.#####.###
#...#...................#...#.#...................#...#...#...#...#.#.#.#.......#...#.#.....#...#.#.....#.........#.......#...#...#.....#...#
#.#.#.###################.#.#.###################.#.###.###.#######.#.#.#.#######.###.#####.###.#.#.###.#.#######.#########.###########.###.#
#.#.#...#.................#...#...#...#.....#...#.#.#...###.......#.#...#.......#...#.#.....###...#...#...###...#.#.....#...###.......#.#...#
#.#.###.#.#####################.#.#.#.#.###.#.#.#.#.#.###########.#.###########.###.#.#.#############.#######.#.#.#.###.#.#####.#####.#.#.###
#.#...#...#...#...#.............#.#.#...#...#.#.#.#.#.........###...#...........#...#...#...#...#.....#.......#.#...###...#.....#...#.#.#...#
#.###.#####.#.#.#.#.#############.#.#####.###.#.#.#.#########.#######.###########.#######.#.#.#.#.#####.#######.###########.#####.#.#.#.###.#
#...#.......#...#...#...#.......#...#...#.....#...#...#...#...#...###.........#...#...#...#...#...#.....#...#...#...###.....#...#.#...#.#...#
###.#################.#.#.#####.#####.#.#############.#.#.#.###.#.###########.#.###.#.#.###########.#####.#.#.###.#.###.#####.#.#.#####.#.###
###.#...#...#.........#...#...#.......#.....#.....###...#...#...#...#.........#.###.#.#.............#.....#...###.#...#.#.....#...#...#...###
###.#.#.#.#.#.#############.#.#############.#.###.###########.#####.#.#########.###.#.###############.###########.###.#.#.#########.#.#######
#...#.#.#.#...###...........#...............#...#.#...#...###...#...#.#...#...#.#...#.....#...###...#.#...###...#.#...#.#.......#...#.#...###
#.###.#.#.#######.#############################.#.#.#.#.#.#####.#.###.#.#.#.#.#.#.#######.#.#.###.#.#.#.#.###.#.#.#.###.#######.#.###.#.#.###
#.....#...###...#.........#...#.................#...#...#.......#...#...#...#.#.#...#...#...#...#.#.#...#.....#...#...#.#.......#.#...#.#...#
#############.#.#########.#.#.#.###################################.#########.#.###.#.#.#######.#.#.#################.#.#.#######.#.###.###.#
#.............#...........#.#...#...............#...#...#...#.......#...#.....#...#.#.#.......#.#.#...#.........#...#...#.......#.#.###.#...#
#.#########################.#####.#############.#.#.#.#.#.#.#.#######.#.#.#######.#.#.#######.#.#.###.#.#######.#.#.###########.#.#.###.#.###
#...................#.....#.....#.............#.#.#...#...#...#...###.#.#.#...#...#...#.......#.#...#.#.......#.#.#...#...#...#...#...#.#...#
###################.#.###.#####.#############.#.#.#############.#.###.#.#.#.#.#.#######.#######.###.#.#######.#.#.###.#.#.#.#.#######.#.###.#
#...................#.#...#...#.###...#.......#.#.#.........#...#.....#...#.#.#.#...###.......#.....#.........#.#.#...#.#...#...#.....#.#...#
#.###################.#.###.#.#.###.#.#.#######.#.#.#######.#.#############.#.#.#.#.#########.#################.#.#.###.#######.#.#####.#.###
#...#...#.......#...#.#.#...#...#...#...#...###...#...#.....#.#.....#.....#.#.#.#.#.....#...#...#.....#.......#...#...#...#...#...#.....#...#
###.#.#.#.#####.#.#.#.#.#.#######.#######.#.#########.#.#####.#.###.#.###.#.#.#.#.#####.#.#.###.#.###.#.#####.#######.###.#.#.#####.#######.#
###...#...#...#...#...#...#.....#.........#...#...#...#.....#.#.#...#...#...#...#.....#...#.....#...#...#.....###...#.....#.#.......#...#...#
###########.#.#############.###.#############.#.#.#.#######.#.#.#.#####.#############.#############.#####.#######.#.#######.#########.#.#.###
#####...#...#.......#...###...#.......#...#...#.#.#.#.......#...#...#...#...........#.....#...#...#.#.....#.......#.........#.........#...###
#####.#.#.#########.#.#.#####.#######.#.#.#.###.#.#.#.#############.#.###.#########.#####.#.#.#.#.#.#.#####.#################.###############
###...#...#.....#...#.#.#...#.#.....#.#.#.#.....#...#.......#.......#...#.....#.....#.....#.#.#.#.#.#.#.....#.............#...###.......#...#
###.#######.###.#.###.#.#.#.#.#.###.#.#.#.#################.#.#########.#####.#.#####.#####.#.#.#.#.#.#.#####.###########.#.#####.#####.#.#.#
#...#.....#.#...#.#...#...#.#...#...#...#...#.......#.......#.......#...#.....#...#...#...#.#...#...#...#...#...#...#...#...#...#.#.....#.#.#
#.###.###.#.#.###.#.#######.#####.#########.#.#####.#.#############.#.###.#######.#.###.#.#.#############.#.###.#.#.#.#.#####.#.#.#.#####.#.#
#...#...#...#...#.#.......#...###.........#.#.....#.#...........#...#.#...#.....#...#...#.#.#...###.......#.....#.#.#.#.#...#.#.#.#.......#.#
###.###.#######.#.#######.###.###########.#.#####.#.###########.#.###.#.###.###.#####.###.#.#.#.###.#############.#.#.#.#.#.#.#.#.#########.#
#...#...###.....#.#.....#...#...###...#...#.#.....#...#.........#.....#.....###.......###...#.#.....#########.....#...#...#...#...#...#.....#
#.###.#####.#####.#.###.###.###.###.#.#.###.#.#######.#.#####################################.###############.#####################.#.#.#####
#.....#...#.....#...#...###...#.#...#.#...#.#.#.....#.#.......#.....#...#.....#...............###############.#.......#.....#...#...#.#.....#
#######.#.#####.#####.#######.#.#.###.###.#.#.#.###.#.#######.#.###.#.#.#.###.#.#############################.#.#####.#.###.#.#.#.###.#####.#
#...#...#.#...#.....#.#...###.#.#...#.....#...#.#...#.........#.#...#.#...#...#..E###########################.#.#...#...###...#.#...#.....#.#
#.#.#.###.#.#.#####.#.#.#.###.#.###.###########.#.#############.#.###.#####.#################################.#.#.#.###########.###.#####.#.#
#.#.#...#...#.......#...#.....#...#.........#...#.........#...#.#...#.#.....#...........#######...#.....###S..#...#.....#...#...#...#...#...#
#.#.###.#########################.#########.#.###########.#.#.#.###.#.#.#####.#########.#######.#.#.###.###############.#.#.#.###.###.#.#####
#.#.###.................#...#...#...........#...#.........#.#.#...#.#.#...###.........#.#.......#.#.#...#...............#.#.#...#...#.#.#...#
#.#.###################.#.#.#.#.###############.#.#########.#.###.#.#.###.###########.#.#.#######.#.#.###.###############.#.###.###.#.#.#.#.#
#.#.#.............#...#.#.#.#.#...........###...#...###.....#...#.#...#...#.....#.....#.#...#...#...#.....#...###.........#...#...#.#.#.#.#.#
#.#.#.###########.#.#.#.#.#.#.###########.###.#####.###.#######.#.#####.###.###.#.#####.###.#.#.###########.#.###.###########.###.#.#.#.#.#.#
#.#.#...........#.#.#.#...#...#...#.....#...#...#...#...#.......#.....#...#.#...#.....#...#...#...#.........#...#.#.........#...#.#.#.#...#.#
#.#.###########.#.#.#.#########.#.#.###.###.###.#.###.###.###########.###.#.#.#######.###.#######.#.###########.#.#.#######.###.#.#.#.#####.#
#.#.......#...#.#...#.###...#...#...###.#...#...#.....#...#...#.....#.#...#.#.....###...#.#...###.#.#.........#...#.......#.#...#...#...#...#
#.#######.#.#.#.#####.###.#.#.#########.#.###.#########.###.#.#.###.#.#.###.#####.#####.#.#.#.###.#.#.#######.###########.#.#.#########.#.###
#.#.....#...#...#...#.....#...#.......#.#.###.....#.....###.#.#.#...#.#.....#...#.#.....#...#...#...#.....###.....#.......#...#...#####.#...#
#.#.###.#########.#.###########.#####.#.#.#######.#.#######.#.#.#.###.#######.#.#.#.###########.#########.#######.#.###########.#.#####.###.#
#.#.###...........#.#.......#...###...#...#...#...#.....#...#.#.#.#...#.......#...#...........#.###.....#.#...###.#.............#...#...#...#
#.#.###############.#.#####.#.#####.#######.#.#.#######.#.###.#.#.#.###.#####################.#.###.###.#.#.#.###.#################.#.###.###
#...#...............#.....#.#...#...#.....#.#.#.....#...#...#...#...#...#...#...###.......#...#...#...#.#...#...#.#...#...#...#...#...#...###
#####.###################.#.###.#.###.###.#.#.#####.#.#####.#########.###.#.#.#.###.#####.#.#####.###.#.#######.#.#.#.#.#.#.#.#.#.#####.#####
#...#.................#...#.#...#...#...#.#.#...#...#...###.....#...#.....#.#.#.#...#.....#...#...#...#.....#...#...#...#...#...#...#...#####
#.#.#################.#.###.#.#####.###.#.#.###.#.#####.#######.#.#.#######.#.#.#.###.#######.#.###.#######.#.#####################.#.#######
#.#.#...#.......###...#.#...#.#.....#...#.#.#...#.....#...#.....#.#.........#.#.#...#.###.....#...#.......#...#...###...#...#...###...#...###
#.#.#.#.#.#####.###.###.#.###.#.#####.###.#.#.#######.###.#.#####.###########.#.###.#.###.#######.#######.#####.#.###.#.#.#.#.#.#######.#.###
#.#.#.#.#.....#.....#...#.....#.......#...#.#.#...#...#...#.....#.#...#.....#.#.#...#...#.....#...###.....#...#.#...#.#...#...#.........#...#
#.#.#.#.#####.#######.#################.###.#.#.#.#.###.#######.#.#.#.#.###.#.#.#.#####.#####.#.#####.#####.#.#.###.#.#####################.#
#.#.#.#.#.....#...#...#...###...#.......###.#.#.#.#...#.#...###.#.#.#.#.#...#.#.#...#...#...#.#.#...#.....#.#.#.#...#...#...................#
#.#.#.#.#.#####.#.#.###.#.###.#.#.#########.#.#.#.###.#.#.#.###.#.#.#.#.#.###.#.###.#.###.#.#.#.#.#.#####.#.#.#.#.#####.#.###################
#.#...#.#.......#...#...#.....#.#.....#.....#.#.#.#...#.#.#.#...#.#.#.#.#.#...#...#.#.#...#.#.#.#.#.#...#...#...#...#...#...................#
#.#####.#############.#########.#####.#.#####.#.#.#.###.#.#.#.###.#.#.#.#.#.#####.#.#.#.###.#.#.#.#.#.#.###########.#.#####################.#
#.....#...............#.......#.....#.#.....#...#.#...#.#.#.#...#...#.#.#.#...#...#.#.#...#...#.#.#...#.#.........#...#.....................#
#####.#################.#####.#####.#.#####.#####.###.#.#.#.###.#####.#.#.###.#.###.#.###.#####.#.#####.#.#######.#####.#####################
#.....#...#.....#.....#...#...#...#...#...#.#.....#...#...#...#.#...#.#.#.#...#...#.#.....#.....#.....#.#...#...#.....#.....................#
#.#####.#.#.###.#.###.###.#.###.#.#####.#.#.#.#####.#########.#.#.#.#.#.#.#.#####.#.#######.#########.#.###.#.#.#####.#####################.#
#...#...#.#.#...#...#.#...#...#.#.#...#.#...#.....#...#.......#.#.#.#...#.#...#...#.......#...#...#...#...#...#...#...#.......#.............#
###.#.###.#.#.#####.#.#.#####.#.#.#.#.#.#########.###.#.#######.#.#.#####.###.#.#########.###.#.#.#.#####.#######.#.###.#####.#.#############
###.#...#.#.#.#.....#.#.#.....#.#...#.#.###...#...#...#...#...#...#...###.#...#.#...#...#.###...#.#.#...#.#.....#.#...#.....#.#.....#.......#
###.###.#.#.#.#.#####.#.#.#####.#####.#.###.#.#.###.#####.#.#.#######.###.#.###.#.#.#.#.#.#######.#.#.#.#.#.###.#.###.#####.#.#####.#.#####.#
#...#...#.#.#.#.#.....#.#.#.....#.....#.#...#.#...#.#.....#.#...#...#.#...#.#...#.#...#.#.....###...#.#...#...#.#.#...#.....#.#...#...#.....#
#.###.###.#.#.#.#.#####.#.#.#####.#####.#.###.###.#.#.#####.###.#.#.#.#.###.#.###.#####.#####.#######.#######.#.#.#.###.#####.#.#.#####.#####
#.#...###...#...#...#...#.#...#...#...#.#...#.....#.#.....#...#.#.#...#...#.#...#.....#.#.....#.......#...#...#.#.#...#.....#...#.#...#.....#
#.#.###############.#.###.###.#.###.#.#.###.#######.#####.###.#.#.#######.#.###.#####.#.#.#####.#######.#.#.###.#.###.#####.#####.#.#.#####.#
#.#.#...###.........#.#...#...#...#.#...###.#...#...#.....#...#.#.....#...#.###.....#.#.#.....#.#.....#.#...#...#...#.#...#...###...#.....#.#
#.#.#.#.###.#########.#.###.#####.#.#######.#.#.#.###.#####.###.#####.#.###.#######.#.#.#####.#.#.###.#.#####.#####.#.#.#.###.###########.#.#
#...#.#...#.....#.....#.....#.....#...#.....#.#...###...#...###...#...#...#...#.....#.#.#...#.#.#.#...#...###.#...#.#.#.#...#.#.........#.#.#
#####.###.#####.#.###########.#######.#.#####.#########.#.#######.#.#####.###.#.#####.#.#.#.#.#.#.#.#####.###.#.#.#.#.#.###.#.#.#######.#.#.#
#...#...#.#...#.#...#.........#.......#.....#...#...#...#.......#...#.....#...#.#...#.#.#.#.#.#...#.#...#...#.#.#.#.#...###.#...#...#...#.#.#
#.#.###.#.#.#.#.###.#.#########.###########.###.#.#.#.#########.#####.#####.###.#.#.#.#.#.#.#.#####.#.#.###.#.#.#.#.#######.#####.#.#.###.#.#
#.#.....#...#...#...#.#.....#...###...#.....#...#.#...#.........#...#...#...###.#.#...#.#.#.#...###...#...#.#...#.#.......#...#...#.#...#.#.#
#.###############.###.#.###.#.#####.#.#.#####.###.#####.#########.#.###.#.#####.#.#####.#.#.###.#########.#.#####.#######.###.#.###.###.#.#.#
#...........#...#...#.#.#...#.###...#...#...#.###.....#.#.....#...#.....#...#...#...###.#.#...#...#.......#.....#.#...#...###...#...#...#.#.#
###########.#.#.###.#.#.#.###.###.#######.#.#.#######.#.#.###.#.###########.#.#####.###.#.###.###.#.###########.#.#.#.#.#########.###.###.#.#
#...........#.#.#...#...#...#...#.........#.#.#...#...#...#...#...#...#...#.#.#.....#...#.###.#...#...#...#...#.#.#.#.#.......#...#...#...#.#
#.###########.#.#.#########.###.###########.#.#.#.#.#######.#####.#.#.#.#.#.#.#.#####.###.###.#.#####.#.#.#.#.#.#.#.#.#######.#.###.###.###.#
#.#.......#...#.#.#.........#...###.......#...#.#.#...#...#.###...#.#.#.#.#.#.#.....#...#...#.#.....#.#.#.#.#.#.#.#.#.#...#...#.#...###...#.#
#.#.#####.#.###.#.#.#########.#####.#####.#####.#.###.#.#.#.###.###.#.#.#.#.#.#####.###.###.#.#####.#.#.#.#.#.#.#.#.#.#.#.#.###.#.#######.#.#
#...###...#...#.#.#.#...#...#.#.....#...#...###.#.....#.#.#...#...#.#.#.#.#.#...#...#...#...#.......#.#.#.#.#.#.#.#.#.#.#.#...#...###.....#.#
#######.#####.#.#.#.#.#.#.#.#.#.#####.#.###.###.#######.#.###.###.#.#.#.#.#.###.#.###.###.###########.#.#.#.#.#.#.#.#.#.#.###.#######.#####.#
#.......#.....#...#.#.#...#...#.....#.#...#.....#.....#.#.#...#...#.#.#.#.#.#...#.###...#...........#.#.#.#.#.#.#.#.#.#.#...#...#...#.#...#.#
#.#######.#########.#.#############.#.###.#######.###.#.#.#.###.###.#.#.#.#.#.###.#####.###########.#.#.#.#.#.#.#.#.#.#.###.###.#.#.#.#.#.#.#
#...#...#.........#.#.#.............#.#...#.....#.#...#.#.#.#...#...#.#.#.#.#.#...#.....#...#.....#.#.#.#.#.#.#.#.#.#.#...#...#...#.#.#.#.#.#
###.#.#.#########.#.#.#.#############.#.###.###.#.#.###.#.#.#.###.###.#.#.#.#.#.###.#####.#.#.###.#.#.#.#.#.#.#.#.#.#.###.###.#####.#.#.#.#.#
###...#...........#...#...............#.....###...#.....#...#.....###...#...#...###.......#...###...#...#...#...#...#.....###.......#...#...#
#############################################################################################################################################`;

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];
