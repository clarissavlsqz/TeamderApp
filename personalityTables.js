const personalities = [
    { personality: "INTP", index: 0 },
    { personality: "INTJ", index: 1 },
    { personality: "INFP", index: 2 },
    { personality: "INFJ", index: 3 },
    { personality: "ISTP", index: 4 },
    { personality: "ISTJ", index: 5 },
    { personality: "ISFP", index: 6 },
    { personality: "ISFJ", index: 7 },
    { personality: "ENTP", index: 8 },
    { personality: "ENTJ", index: 9 },
    { personality: "ENFP", index: 10 },
    { personality: "ENFJ", index: 11 },
    { personality: "ESTP", index: 12 },
    { personality: "ESTJ", index: 13 },
    { personality: "ESFP", index: 14 },
    { personality: "ESFJ", index: 15 },
];

// create a 2D array
var table = new Array(16);
for (var i = 0; i < table.length; i++) {
  table[i] = new Array(16);
}

// fill in the table
// INTP
table[0][0] = 0;
table[0][1] = 4;
table[0][2] = 4;
table[0][3] = 4;
table[0][4] = 3;
table[0][5] = 2;
table[0][6] = 3;
table[0][7] = 2;
table[0][8] = 4;
table[0][9] = 5;
table[0][10] = 4;
table[0][11] = 4;
table[0][12] = 3;
table[0][13] = 5;
table[0][14] = 3;
table[0][15] = 2;

// INTJ
table[1][0] = 4;
table[1][1] = 4;
table[1][2] = 4;
table[1][3] = 4;
table[1][4] = 3;
table[1][5] = 2;
table[1][6] = 3;
table[1][7] = 2;
table[1][8] = 5;
table[1][9] = 4;
table[1][10] = 5;
table[1][11] = 4;
table[1][12] = 3;
table[1][13] = 2;
table[1][14] = 3;
table[1][15] = 2;

// INFP
table[2][0] = 4;
table[2][1] = 4;
table[2][2] = 0;
table[2][3] = 4;
table[2][4] = 1;
table[2][5] = 1;
table[2][6] = 1;
table[2][7] = 1;
table[2][8] = 4;
table[2][9] = 5;
table[2][10] = 4;
table[2][11] = 5;
table[2][12] = 1;
table[2][13] = 1;
table[2][14] = 1;
table[2][15] = 1;

// INFJ
table[3][0] = 4;
table[3][1] = 4;
table[3][2] = 4;
table[3][3] = 0;
table[3][4] = 1;
table[3][5] = 1;
table[3][6] = 1;
table[3][7] = 1;
table[3][8] = 5;
table[3][9] = 4;
table[3][10] = 5;
table[3][11] = 4;
table[3][12] = 1;
table[3][13] = 1;
table[3][14] = 1;
table[3][15] = 1;


// ISTP
table[4][0] = 3;
table[4][1] = 3;
table[4][2] = 1;
table[4][3] = 1;
table[4][4] = 0;
table[4][5] = 3;
table[4][6] = 2;
table[4][7] = 3;
table[4][8] = 3;
table[4][9] = 3;
table[4][10] = 1;
table[4][11] = 1;
table[4][12] = 2;
table[4][13] = 5;
table[4][14] = 2;
table[4][15] = 5;

// ISTJ
table[5][0] = 2;
table[5][1] = 2;
table[5][2] = 1;
table[5][3] = 1;
table[5][4] = 3;
table[5][5] = 0;
table[5][6] = 3;
table[5][7] = 4;
table[5][8] = 2;
table[5][9] = 3;
table[5][10] = 1;
table[5][11] = 1;
table[5][12] = 5;
table[5][13] = 4;
table[5][14] = 5;
table[5][15] = 4;

// ISTJ
table[6][0] = 3;
table[6][1] = 3;
table[6][2] = 1;
table[6][3] = 1;
table[6][4] = 2;
table[6][5] = 3;
table[6][6] = 0;
table[6][7] = 3;
table[6][8] = 3;
table[6][9] = 3;
table[6][10] = 1;
table[6][11] = 5;
table[6][12] = 2;
table[6][13] = 5;
table[6][14] = 2;
table[6][15] = 5;

// ISFJ
table[7][0] = 2;
table[7][1] = 2;
table[7][2] = 1;
table[7][3] = 1;
table[7][4] = 3;
table[7][5] = 4;
table[7][6] = 3;
table[7][7] = 0;
table[7][8] = 2;
table[7][9] = 3;
table[7][10] = 1;
table[7][11] = 1;
table[7][12] = 5;
table[7][13] = 4;
table[7][14] = 5;
table[7][15] = 4;


// ENTP
table[8][0] = 4;
table[8][1] = 5;
table[8][2] = 4;
table[8][3] = 5;
table[8][4] = 3;
table[8][5] = 2;
table[8][6] = 3;
table[8][7] = 2;
table[8][8] = 0;
table[8][9] = 4;
table[8][10] = 4;
table[8][11] = 4;
table[8][12] = 3;
table[8][13] = 2;
table[8][14] = 3;
table[8][15] = 2;

// ENTJ
table[9][0] = 5;
table[9][1] = 4;
table[9][2] = 5;
table[9][3] = 4;
table[9][4] = 3;
table[9][5] = 3;
table[9][6] = 3;
table[9][7] = 3;
table[9][8] = 4;
table[9][9] = 0;
table[9][10] = 4;
table[9][11] = 4;
table[9][12] = 3;
table[9][13] = 3;
table[9][14] = 3;
table[9][15] = 3;

// ENFP
table[10][0] = 4;
table[10][1] = 5;
table[10][2] = 4;
table[10][3] = 5;
table[10][4] = 1;
table[10][5] = 1;
table[10][6] = 1;
table[10][7] = 1;
table[10][8] = 4;
table[10][9] = 4;
table[10][10] = 4;
table[10][11] = 1;
table[10][12] = 1;
table[10][13] = 1;
table[10][14] = 1;
table[10][15] = 1;

// ENFJ
table[11][0] = 4;
table[11][1] = 4;
table[11][2] = 5;
table[11][3] = 4;
table[11][4] = 1;
table[11][5] = 1;
table[11][6] = 5;
table[11][7] = 1;
table[11][8] = 4;
table[11][9] = 4;
table[11][10] = 4;
table[11][11] = 0;
table[11][12] = 1;
table[11][13] = 1;
table[11][14] = 1;
table[11][15] = 1;

// ESTP
table[12][0] = 3;
table[12][1] = 3;
table[12][2] = 1;
table[12][3] = 1;
table[12][4] = 2;
table[12][5] = 5;
table[12][6] = 2;
table[12][7] = 5;
table[12][8] = 3;
table[12][9] = 3;
table[12][10] = 1;
table[12][11] = 1;
table[12][12] = 0;
table[12][13] = 3;
table[12][14] = 2;
table[12][15] = 3;

// ESTJ
table[13][0] = 5;
table[13][1] = 2;
table[13][2] = 1;
table[13][3] = 1;
table[13][4] = 5;
table[13][5] = 4;
table[13][6] = 5;
table[13][7] = 4;
table[13][8] = 2;
table[13][9] = 3;
table[13][10] = 1;
table[13][11] = 1;
table[13][12] = 3;
table[13][13] = 0;
table[13][14] = 3;
table[13][15] = 4;

// ESFP
table[14][0] = 3;
table[14][1] = 3;
table[14][2] = 1;
table[14][3] = 1;
table[14][4] = 2;
table[14][5] = 5;
table[14][6] = 2;
table[14][7] = 5;
table[14][8] = 3;
table[14][9] = 3;
table[14][10] = 1;
table[14][11] = 1;
table[14][12] = 2;
table[14][13] = 3;
table[14][14] = 0;
table[14][15] = 3;

// ESFJ
table[15][0] = 2;
table[15][1] = 2;
table[15][2] = 1;
table[15][3] = 1;
table[15][4] = 5;
table[15][5] = 4;
table[15][6] = 5;
table[15][7] = 4;
table[15][8] = 2;
table[15][9] = 3;
table[15][10] = 1;
table[15][11] = 1;
table[15][12] = 3;
table[15][13] = 4;
table[15][14] = 3;
table[15][15] = 0;

// print out the table
//for (var i = 0; i < table.length; i++) {
// for (var j = 0; j < table[i].length; j++) {
//   console.log(table[i][j] + " ");
//  }
//  console.log("\n");
//}

export const personalityTable = personalities;
export const personalityWeightTable = table

