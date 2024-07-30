package com.example.gymTrack.domain.entity;

public enum ExerciseType {

    CHEST(0),
    SHOULDERS(1),
    BICEPS(2),
    TRICEPS(3),
    FOREARM(4),
    TRAPS(5),
    LATS(6),
    MIDDLE_BACK(7),
    LOW_BACK(8),
    ABS(9),
    QUADRICEPS(10),
    GLUTES(11),
    ABDUCTORS(12),
    ADDUCTORS(13),
    HAMSTRINGS(14),
    CALF(15);

    private final int value;

    ExerciseType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }




}
