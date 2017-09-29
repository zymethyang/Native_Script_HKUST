#include <stdio.h>
#include <limits.h>

void main (){
    int a[10];int swap;int min;int index;int ktra_so_le=0;int so_le[10]={0};
    for(int i=0;i<10;i++){
        printf("Nhap vao phan tu thu %d \n",i);
        scanf("%d",&a[i]);
    }
    
    for(int i=0;i<10;i++){
        min=INT_MAX;
        for(int j=i;j<10;j++){
          if(a[j]<min){
            min=a[j];
            index=j;
          }
        }
        swap=a[i];
        a[i]=a[index];
        a[index]=swap;

        if((a[i]%2)==1 || (a[i]%2)==(-1)){
            so_le[i]=a[i];
            ktra_so_le=1;
        }
    }
    for(int i=0;i<10;i++){
        printf("Phan tu thu %d la : %d \n",i,a[i]);
    }


    if(ktra_so_le){
        for(int i=0;i<10;i++){
            if(so_le[i]!=0){
                printf("So le la: %d \n",so_le[i]);
            }
        }
    }else{
        printf("Khong co so le! ");
    }
}
