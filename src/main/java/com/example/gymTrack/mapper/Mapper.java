package com.example.gymTrack.mapper;

public interface Mapper<E, Res, Req> {


    E toEntity(Req req);

    Res toResponse(E e);
}
