#include <stdio.h>
void main(){
    int temp[3][5];

    for(int i=0;i<3;i++){
        printf("Du lieu nhiet do ngay thu %d \n",i);
        for(int j=0;j<5;j++){
            printf("Du lieu nhiet do ngay thu %d , lan thu %d",i,j);
            scanf("%d",&temp[i][j]);
        }
    }

    
}