# Knights Travails

## Introduction

Given enough turns, a knight on a standard 8x8 chess board can move from </br>
any square to any other square. </br>
In this problem, the chessboard can be represented as a graph. </br>
Each square on the board is a node (vertex). A knight's valid moves from </br>
any square represent the edges (connections) between the vertices. Thus, </br>
the problem of finding the shortest path for the knight's movement becomes </br>
a graph traversal problem. The goal is to traverse the graph to find </br>
the shortest route between two nodes (the start and end positions).

## Vertices and Edges

The vertices in this graph are each of the possible positions on the chessboard, </br>
represented by a pair of coordinates [x, y], where x and y are between 0 and 7. </br>
The edges are valid knight moves between vertices.

## Assignment

Build a function knightMoves that shows the shortest possible way to get from </br>
one square to another by outputting all squares the knight will stop on along </br>
the way. </br>
Example function calls: </br>
`knightMoves([0,0],[1,2]) // returns [[0,0],[1,2]]`</br>
`knightMoves([0,0],[3,3]) // may return [[0,0],[2,1],[3,3]] OR [[0,0],[1,2],[3,3]]`</br>
`knightMoves([3,3],[0,0]) // may return [[3,3],[2,1],[0,0]] OR [[3,3],[1,2],[0,0]]`</br>
`knightMoves([0,0],[7,7]) // may return [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]] OR [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]`
